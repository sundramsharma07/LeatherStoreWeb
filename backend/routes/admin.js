import express from 'express';
import ListedProduct from '../models/ListedProduct.js';
import User from '../models/User.js';
import Design from '../models/Design.js';
import Sale from '../models/Sale.js';
import Notification from '../models/Notification.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { serializeListedProduct } from './listedProducts.js';

const router = express.Router();

// @route   GET /api/admin/pending-products
// @desc    Get all pending products
router.get('/admin/pending-products', protect, adminOnly, async (req, res) => {
  try {
    const products = await ListedProduct.find({ status: 'pending' })
      .populate('user', 'name email')
      .populate({
        path: 'design',
        populate: { path: 'product', select: 'category image_url' }
      })
      .sort({ createdAt: -1 });

    const serialized = products.map(p => serializeListedProduct(p));
    res.json({ products: serialized });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   PATCH /api/admin/products/:id/status
// @desc    Approve or reject a listed product
router.patch('/admin/products/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['approved', 'rejected'].includes(status)) {
      return res.status(422).json({ message: 'Validation failed: Status must be approved or rejected.' });
    }

    const listedProduct = await ListedProduct.findById(req.params.id);
    if (!listedProduct) {
      return res.status(404).json({ message: 'Product listing not found.' });
    }

    listedProduct.status = status;
    await listedProduct.save();

    // Trigger Notification for the Seller
    if (status === 'approved') {
      await Notification.create({
        user: listedProduct.user,
        title: 'Listing Confirmed',
        content: `Your product listing "${listedProduct.title}" has been successfully approved by the store admin and is now live in the storefront catalog!`,
        type: 'approval'
      });
    } else {
      await Notification.create({
        user: listedProduct.user,
        title: 'Listing Rejected',
        content: `Your product listing "${listedProduct.title}" was reviewed and rejected by the admin. Please verify prompt guideline specifications.`,
        type: 'approval'
      });
    }

    res.json({ message: `Product status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status: ' + error.message });
  }
});

// @route   GET /api/admin/sellers
// @desc    Get all registered sellers and counts of their catalog
router.get('/admin/sellers', protect, adminOnly, async (req, res) => {
  try {
    const sellers = await User.find({ role: 'seller' }).sort({ createdAt: -1 });

    const serialized = [];
    for (const seller of sellers) {
      const productsCount = await ListedProduct.countDocuments({ user: seller._id });
      const designsCount = await Design.countDocuments({ user: seller._id });

      serialized.push({
        id: seller._id,
        name: seller.name,
        email: seller.email,
        phone: seller.phone,
        products_count: productsCount,
        designs_count: designsCount,
        created_at: seller.createdAt,
        updated_at: seller.updatedAt
      });
    }

    res.json({ sellers: serialized });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   GET /api/admin/sellers/:id/designs
// @desc    Get all designs made by a seller
router.get('/admin/sellers/:id/designs', protect, adminOnly, async (req, res) => {
  try {
    const seller = await User.findById(req.params.id);
    if (!seller || seller.role !== 'seller') {
      return res.status(404).json({ message: 'Seller not found.' });
    }

    const designs = await Design.find({ user: seller._id })
      .populate('product', 'category image_url')
      .sort({ createdAt: -1 });

    const serialized = designs.map(d => ({
      id: d._id,
      user_id: d.user,
      product_id: d.product?._id || null,
      original_image: d.original_image,
      ai_image: d.ai_image,
      prompt: d.prompt,
      created_at: d.createdAt,
      product: d.product ? {
        id: d.product._id,
        category: d.product.category,
        image_url: d.product.image_url
      } : null
    }));

    res.json({ designs: serialized });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   GET /api/admin/sales
// @desc    Get all sales analytics
router.get('/admin/sales', protect, adminOnly, async (req, res) => {
  try {
    const sales = await Sale.find({})
      .populate('seller', 'name email')
      .populate('buyer', 'name email')
      .populate({
        path: 'listedProduct',
        populate: { path: 'design' }
      })
      .sort({ createdAt: -1 });

    const totalAdminCommission = sales.reduce((acc, sale) => acc + sale.admin_commission, 0);

    const serializedSales = sales.map(s => {
      const productTitle = s.listedProduct?.title || 'Printed Leather Item';
      const aiImage = s.listedProduct?.design?.ai_image || '';

      return {
        id: s._id,
        listed_product_id: s.listedProduct?._id || null,
        seller_id: s.seller?._id || null,
        buyer_id: s.buyer?._id || null,
        amount: s.amount,
        admin_commission: s.admin_commission,
        seller_earnings: s.seller_earnings,
        status: s.status,
        created_at: s.createdAt,
        updated_at: s.updatedAt,
        seller: s.seller ? {
          id: s.seller._id,
          name: s.seller.name,
          email: s.seller.email
        } : null,
        buyer: s.buyer ? {
          id: s.buyer._id,
          name: s.buyer.name,
          email: s.buyer.email
        } : null,
        listed_product: s.listedProduct ? {
          id: s.listedProduct._id,
          title: productTitle,
          price: s.listedProduct.price,
          design: {
            id: s.listedProduct.design?._id || null,
            ai_image: aiImage
          }
        } : null
      };
    });

    res.json({
      sales: serializedSales,
      total_admin_commission: totalAdminCommission
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   PATCH /api/admin/sales/:id/status
// @desc    Update order shipping/fulfillment status
router.patch('/admin/sales/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !['confirmed', 'processing', 'shipped', 'delivered'].includes(status)) {
      return res.status(422).json({ message: 'Validation failed: Status must be confirmed, processing, shipped, or delivered.' });
    }

    const sale = await Sale.findById(req.params.id).populate('listedProduct');
    if (!sale) {
      return res.status(404).json({ message: 'Order record not found.' });
    }

    sale.status = status;
    await sale.save();

    const productTitle = sale.listedProduct?.title || 'Printed Leather Item';

    // 1. Notify Buyer
    let buyerTitle = 'Order Update';
    let buyerContent = `Your order #${sale._id} has been updated to "${status}".`;

    if (status === 'confirmed') {
      buyerTitle = 'Order Confirmed';
      buyerContent = `Your order #${sale._id} for "${productTitle}" has been confirmed by the store admin!`;
    } else if (status === 'processing') {
      buyerTitle = 'Order Processing';
      buyerContent = `Your order #${sale._id} is now being custom printed and processed.`;
    } else if (status === 'shipped') {
      buyerTitle = 'Order Shipped';
      buyerContent = `Hurrah! Your custom printed leather item for order #${sale._id} has been shipped and is on the way!`;
    } else if (status === 'delivered') {
      buyerTitle = 'Order Delivered';
      buyerContent = `Order Delivered: Enjoy your custom printed leather goods! Your order #${sale._id} is now complete.`;
    }

    if (sale.buyer) {
      await Notification.create({
        user: sale.buyer,
        title: buyerTitle,
        content: buyerContent,
        type: 'shipping'
      });
    }

    // 2. Notify Seller
    await Notification.create({
      user: sale.seller,
      title: 'Fulfillment Update',
      content: `Fulfillment progress: The order for your custom design "${productTitle}" (Order #${sale._id}) is now "${status}".`,
      type: 'shipping'
    });

    const populated = await Sale.findById(sale._id)
      .populate('seller', 'name email')
      .populate('buyer', 'name email')
      .populate({
        path: 'listedProduct',
        populate: { path: 'design' }
      });

    const serializedSale = {
      id: populated._id,
      listed_product_id: populated.listedProduct?._id || null,
      seller_id: populated.seller?._id || null,
      buyer_id: populated.buyer?._id || null,
      amount: populated.amount,
      admin_commission: populated.admin_commission,
      seller_earnings: populated.seller_earnings,
      status: populated.status,
      created_at: populated.createdAt,
      updated_at: populated.updatedAt,
      seller: populated.seller ? {
        id: populated.seller._id,
        name: populated.seller.name,
        email: populated.seller.email
      } : null,
      buyer: populated.buyer ? {
        id: populated.buyer._id,
        name: populated.buyer.name,
        email: populated.buyer.email
      } : null,
      listed_product: populated.listedProduct ? {
        id: populated.listedProduct._id,
        title: productTitle,
        price: populated.listedProduct.price,
        design: {
          id: populated.listedProduct.design?._id || null,
          ai_image: populated.listedProduct.design?.ai_image || ''
        }
      } : null
    };

    res.json({
      message: `Order status updated to ${status}`,
      sale: serializedSale
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status: ' + error.message });
  }
});

export default router;
