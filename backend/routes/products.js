import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';
import Design from '../models/Design.js';
import { protect } from '../middleware/auth.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer Storage Configuration (Temporary local storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../public/storage/leather/products');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Images only (jpeg, jpg, png, webp, gif)'));
    }
  }
});

// @route   GET /api/products
// @desc    Get all base products uploaded by the authenticated seller
router.get('/products', protect, async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id }).sort({ createdAt: -1 });
    // Transform to output user_id to match PHP backend serialize style
    const serializedProducts = products.map(prod => ({
      id: prod._id,
      user_id: prod.user,
      image_url: prod.image_url,
      category: prod.category,
      created_at: prod.createdAt,
      updated_at: prod.updatedAt
    }));

    res.json({ products: serializedProducts });
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving products: ' + error.message });
  }
});

// @route   POST /api/product/upload
// @desc    Upload product image & create record
router.post('/product/upload', protect, upload.single('image'), async (req, res) => {
  try {
    const { category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image file.' });
    }

    if (!category) {
      return res.status(422).json({ message: 'Validation failed: Category is required.' });
    }

    // Upload to Cloudinary
    let fileUrl;
    try {
      const cloudinaryResult = await uploadToCloudinary(req.file.path, 'leather/products');
      fileUrl = cloudinaryResult.secure_url;
      // Clean up temp file
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    } catch (uploadError) {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(500).json({ message: 'Cloudinary upload failed: ' + uploadError.message });
    }

    const product = await Product.create({
      user: req.user._id,
      image_url: fileUrl,
      category
    });

    res.status(201).json({
      product: {
        id: product._id,
        user_id: product.user,
        image_url: product.image_url,
        category: product.category,
        created_at: product.createdAt,
        updated_at: product.updatedAt
      },
      storage_provider: 'cloudinary'
    });
  } catch (error) {
    res.status(500).json({ message: 'Product upload failed: ' + error.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product, associated designs, and physical files from storage
router.delete('/products/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Ensure the seller owns the product
    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    // Find and delete all designs associated with this product
    const designs = await Design.find({ product: product._id });

    // Helper to delete files (supports both local and Cloudinary)
    const deleteFile = async (url) => {
      if (!url) return;
      try {
        if (url.includes('res.cloudinary.com')) {
          await deleteFromCloudinary(url);
        } else {
          const parts = url.split('/storage/');
          if (parts.length > 1) {
            const relativePath = parts[1];
            const absolutePath = path.join(__dirname, '../public/storage', relativePath);
            if (fs.existsSync(absolutePath)) {
              fs.unlinkSync(absolutePath);
            }
          }
        }
      } catch (err) {
        console.error('File deletion error:', err.message);
      }
    };

    // Delete designs physical files
    for (const design of designs) {
      await deleteFile(design.ai_image);
      await Design.findByIdAndDelete(design._id);
    }

    // Delete base product physical file
    await deleteFile(product.image_url);

    // Delete from database
    await Product.findByIdAndDelete(product._id);

    res.json({
      message: 'Product and associated files deleted successfully.'
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product: ' + error.message });
  }
});

export default router;
export { upload }; // Expose upload middleware if needed elsewhere
