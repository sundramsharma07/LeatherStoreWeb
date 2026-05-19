import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Design from '../models/Design.js';
import Product from '../models/Product.js';
import ListedProduct from '../models/ListedProduct.js';
import { protect } from '../middleware/auth.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const designStorageDir = path.join(__dirname, '../storage/app/public/leather/designs');

// Multer Storage Configuration for Designs (Temporary local storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(designStorageDir, { recursive: true });
    cb(null, designStorageDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

// @route   GET /api/designs
// @desc    Get all designs for the authenticated seller
router.get('/designs', protect, async (req, res) => {
  try {
    const designs = await Design.find({ user: req.user._id })
      .populate('product', 'category image_url')
      .sort({ createdAt: -1 });

    const serializedDesigns = [];

    for (const d of designs) {
      // Find listedProduct related to this design
      const listed = await ListedProduct.findOne({ design: d._id }).select('status price');
      
      serializedDesigns.push({
        id: d._id,
        user_id: d.user,
        product_id: d.product?._id || null,
        original_image: d.original_image,
        ai_image: d.ai_image,
        prompt: d.prompt,
        created_at: d.createdAt,
        updated_at: d.updatedAt,
        product: d.product ? {
          id: d.product._id,
          category: d.product.category,
          image_url: d.product.image_url
        } : null,
        listed_product: listed ? {
          id: listed._id,
          design_id: d._id,
          status: listed.status,
          price: listed.price
        } : null
      });
    }

    res.json({ designs: serializedDesigns });
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving designs: ' + error.message });
  }
});

// @route   POST /api/design/save
// @desc    Save manual custom design
router.post('/design/save', protect, upload.single('design_image'), async (req, res) => {
  try {
    const { product_id, original_image } = req.body;
    console.log('[design/save] body:', { product_id, original_image })
    console.log('[design/save] file:', req.file ? req.file.originalname : 'MISSING')
    console.log('[design/save] user:', req.user?._id)

    if (!req.file) {
      return res.status(422).json({ message: 'Validation failed: Design image is required.' });
    }

    // Product is optional so sellers can save raw canvas designs created in Studio mode.
    let product = null;
    if (product_id) {
      product = await Product.findById(product_id);
      console.log('[design/save] product found:', product ? product._id : 'NOT FOUND')
      if (!product) {
        return res.status(422).json({ message: 'Base product not found. Please select a valid product from the catalog.' });
      }
    }

    // Upload to Cloudinary
    let fileUrl;
    try {
      const cloudinaryResult = await uploadToCloudinary(req.file.path, 'leather/designs');
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

    const designPayload = {
      user: req.user._id,
      original_image: original_image || product?.image_url || '',
      ai_image: fileUrl,
      prompt: 'Manual Design Upload'
    };

    if (product) {
      designPayload.product = product._id;
    }

    const design = await Design.create(designPayload);

    res.status(201).json({
      design: {
        id: design._id,
        user_id: design.user,
        product_id: design.product || null,
        original_image: design.original_image,
        ai_image: design.ai_image,
        prompt: design.prompt,
        created_at: design.createdAt,
        updated_at: design.updatedAt,
        product: product ? {
          id: product._id,
          category: product.category,
          image_url: product.image_url
        } : null
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save design: ' + error.message });
  }
});

// @route   DELETE /api/design/:id
// @desc    Delete design
router.delete('/design/:id', protect, async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({ message: 'Design not found.' });
    }

    if (design.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized action.' });
    }

    // Delete file from Cloudinary or local storage
    try {
      if (design.ai_image.includes('res.cloudinary.com')) {
        await deleteFromCloudinary(design.ai_image);
      } else {
        const parts = design.ai_image.split('/storage/');
        if (parts.length > 1) {
          const relativePath = parts[1];
          const absolutePath = path.join(__dirname, '../public/storage', relativePath);
          if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
          }
        }
      }
    } catch (e) {
      console.error('Failed to delete design file:', e.message);
    }

    await Design.findByIdAndDelete(design._id);

    res.json({ message: 'Design deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete design: ' + error.message });
  }
});

export default router;
