import express from 'express';
import ListedProduct from '../models/ListedProduct.js';
import Design from '../models/Design.js';
import Sale from '../models/Sale.js';
import Notification from '../models/Notification.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Helper to serialize product in the exact shape the React client/seller dashboard expects
const serializeListedProduct = (product, unitsSold = 0, netEarnings = 0.0) => {
  return {
    id: product._id,
    user_id: product.user?._id || product.user,
    design_id: product.design?._id || product.design,
    title: product.title,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    status: product.status,
    units_sold: unitsSold,
    net_earnings: netEarnings,
    created_at: product.createdAt,
    updated_at: product.updatedAt,
    user: product.user && product.user.name ? {
      id: product.user._id,
      name: product.user.name,
      email: product.user.email
    } : null,
    design: product.design && product.design.ai_image ? {
      id: product.design._id,
      ai_image: product.design.ai_image,
      product: product.design.product ? {
        id: product.design.product._id,
        category: product.design.product.category,
        image_url: product.design.product.image_url
      } : null
    } : null
  };
};

// @route   GET /api/marketplace/products
// @desc    Get all products listed by the authenticated seller
router.get('/marketplace/products', protect, async (req, res) => {
  try {
    const products = await ListedProduct.find({ user: req.user._id })
      .populate({
        path: 'design',
        populate: { path: 'product', select: 'category image_url' }
      })
      .sort({ createdAt: -1 });

    const serialized = [];
    for (const p of products) {
      const sales = await Sale.find({ listedProduct: p._id });
      const unitsSold = sales.length;
      const netEarnings = sales.reduce((acc, sale) => acc + sale.seller_earnings, 0);

      serialized.push(serializeListedProduct(p, unitsSold, netEarnings));
    }

    res.json({ listed_products: serialized });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   POST /api/marketplace/products
// @desc    List a product for admin review
router.post('/marketplace/products', protect, async (req, res) => {
  try {
    const { design_id, title, description, price, quantity } = req.body;

    if (!design_id || !title || price === undefined || quantity === undefined) {
      return res.status(422).json({ message: 'Validation failed: design_id, title, price, and quantity are required.' });
    }

    const design = await Design.findOne({ _id: design_id, user: req.user._id });
    if (!design) {
      return res.status(404).json({ message: 'Design not found.' });
    }

    const listedProduct = await ListedProduct.create({
      user: req.user._id,
      design: design._id,
      title,
      description: description || '',
      price: parseFloat(price),
      quantity: parseInt(quantity)
    });

    // Create Notification for Admin (user: null)
    await Notification.create({
      user: null,
      title: 'New Product Listed',
      content: `Seller "${req.user.name}" listed a new custom print "${listedProduct.title}" waiting for your review.`,
      type: 'listing'
    });

    const populated = await ListedProduct.findById(listedProduct._id)
      .populate({
        path: 'design',
        populate: { path: 'product', select: 'category image_url' }
      });

    res.status(201).json({
      message: 'Product listed successfully. Waiting for admin approval.',
      listed_product: serializeListedProduct(populated)
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create listing: ' + error.message });
  }
});

// @route   PUT /api/marketplace/products/:id
// @desc    Update listed product inventory/details
router.put('/marketplace/products/:id', protect, async (req, res) => {
  try {
    const { title, description, quantity } = req.body;
    const product = await ListedProduct.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product listing not found.' });
    }

    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized action.' });
    }

    if (title !== undefined) product.title = title;
    if (description !== undefined) product.description = description;
    if (quantity !== undefined) product.quantity = parseInt(quantity);

    await product.save();

    const populated = await ListedProduct.findById(product._id)
      .populate({
        path: 'design',
        populate: { path: 'product', select: 'category image_url' }
      });

    res.json({
      message: 'Product inventory details updated successfully.',
      listed_product: serializeListedProduct(populated)
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update listing: ' + error.message });
  }
});

// @route   POST /api/marketplace/products/:id/purchase
// @desc    Mock purchase a product
router.post('/marketplace/products/:id/purchase', protect, async (req, res) => {
  try {
    const listedProduct = await ListedProduct.findById(req.params.id);

    if (!listedProduct) {
      return res.status(404).json({ message: 'Product listing not found.' });
    }

    if (listedProduct.status !== 'approved') {
      return res.status(400).json({ message: 'Cannot purchase an unapproved product.' });
    }

    if (listedProduct.quantity <= 0) {
      return res.status(400).json({ message: 'This product is out of stock.' });
    }

    const amount = listedProduct.price;
    const adminCommission = amount * 0.10;
    const sellerEarnings = amount * 0.90;

    const sale = await Sale.create({
      listedProduct: listedProduct._id,
      seller: listedProduct.user,
      buyer: req.user._id,
      amount,
      admin_commission: adminCommission,
      seller_earnings: sellerEarnings,
      status: 'processing'
    });

    // Decrement stock
    listedProduct.quantity -= 1;
    await listedProduct.save();

    // Trigger Notifications
    // 1. Notify Buyer
    await Notification.create({
      user: req.user._id,
      title: 'Order Confirmed',
      content: `Thank you! Your purchase of "${listedProduct.title}" (x1) has been successfully processed.`,
      type: 'purchase'
    });

    // 2. Notify Seller
    await Notification.create({
      user: listedProduct.user,
      title: 'Product Purchased',
      content: `Great news! Customer "${req.user.name}" purchased your product "${listedProduct.title}" (x1). Net Earnings: ₹${sellerEarnings.toFixed(2)}.`,
      type: 'purchase'
    });

    // 3. Notify Admin
    await Notification.create({
      user: null,
      title: 'New Order Placed',
      content: `Customer "${req.user.name}" purchased "${listedProduct.title}" from Seller ID ${listedProduct.user}. Amount: ₹${amount.toFixed(2)}, Admin Commission: ₹${adminCommission.toFixed(2)}.`,
      type: 'purchase'
    });

    res.json({
      message: 'Purchase successful.',
      sale: {
        id: sale._id,
        listed_product_id: sale.listedProduct,
        seller_id: sale.seller,
        buyer_id: sale.buyer,
        amount: sale.amount,
        admin_commission: sale.admin_commission,
        seller_earnings: sale.seller_earnings,
        status: sale.status,
        created_at: sale.createdAt,
        updated_at: sale.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Purchase failed: ' + error.message });
  }
});

// @route   GET /api/sales
// @desc    Get all sales for the seller
router.get('/sales', protect, async (req, res) => {
  try {
    const sales = await Sale.find({ seller: req.user._id })
      .populate({
        path: 'listedProduct',
        populate: {
          path: 'design',
          populate: { path: 'product', select: 'category image_url' }
        }
      })
      .sort({ createdAt: -1 });

    const totalEarnings = sales.reduce((acc, sale) => acc + sale.seller_earnings, 0);

    const serializedSales = sales.map(s => {
      const productTitle = s.listedProduct?.title || 'Printed Leather Item';
      const aiImage = s.listedProduct?.design?.ai_image || '';
      const category = s.listedProduct?.design?.product?.category || '';

      return {
        id: s._id,
        listed_product_id: s.listedProduct?._id || null,
        seller_id: s.seller,
        buyer_id: s.buyer,
        amount: s.amount,
        admin_commission: s.admin_commission,
        seller_earnings: s.seller_earnings,
        status: s.status,
        created_at: s.createdAt,
        updated_at: s.updatedAt,
        listed_product: s.listedProduct ? {
          id: s.listedProduct._id,
          title: productTitle,
          price: s.listedProduct.price,
          design: {
            id: s.listedProduct.design?._id,
            ai_image: aiImage,
            product: s.listedProduct.design?.product ? {
              id: s.listedProduct.design.product._id,
              category: category,
              image_url: s.listedProduct.design.product.image_url
            } : null
          }
        } : null
      };
    });

    res.json({
      sales: serializedSales,
      total_earnings: totalEarnings
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error sales ledger: ' + error.message });
  }
});

// ================= PUBLIC ROUTES =================

// @route   GET /api/public/products
// @desc    Get all approved products in the catalog
router.get('/public/products', async (req, res) => {
  try {
    const products = await ListedProduct.find({ status: 'approved', quantity: { $gt: 0 } })
      .populate({
        path: 'design',
        populate: { path: 'product', select: 'category image_url' }
      })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    const serialized = products.map(p => serializeListedProduct(p));
    res.json({ products: serialized });
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving catalog: ' + error.message });
  }
});

// @route   GET /api/public/products/:id
// @desc    Get single approved product details
router.get('/public/products/:id', async (req, res) => {
  try {
    const product = await ListedProduct.findById(req.params.id)
      .populate({
        path: 'design',
        populate: { path: 'product', select: 'category image_url' }
      })
      .populate('user', 'name');

    if (!product || product.status !== 'approved') {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.json({ product: serializeListedProduct(product) });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

export default router;
export { serializeListedProduct };
