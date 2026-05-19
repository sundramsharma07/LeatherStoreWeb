import express from 'express';
import Stripe from 'stripe';
import ListedProduct from '../models/ListedProduct.js';
import Sale from '../models/Sale.js';
import Notification from '../models/Notification.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const stripeSecret = process.env.STRIPE_SECRET || '';
const stripe = new Stripe(stripeSecret);

// @route   POST /api/payments/create-intent
// @desc    Create a Stripe PaymentIntent for customer orders
router.post('/payments/create-intent', protect, async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Validation failed: Items array is required and cannot be empty.' });
    }

    let totalAmount = 0.0;
    const itemsToPurchase = [];

    for (const item of items) {
      const product = await ListedProduct.findById(item.id);
      
      if (!product) {
        return res.status(404).json({ message: `Product listing not found for ID: ${item.id}` });
      }

      if (product.status !== 'approved') {
        return res.status(400).json({ message: `Product '${product.title}' is not available for purchase.` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for '${product.title}'. Remaining: ${product.quantity} units.` });
      }

      totalAmount += product.price * item.quantity;
      itemsToPurchase.push({
        product,
        quantity: item.quantity
      });
    }

    // Stripe expects amount in cents/paise
    const amountInCents = Math.round(totalAmount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'inr',
      payment_method_types: ['card'],
      metadata: {
        items: JSON.stringify(itemsToPurchase.map(item => ({
          id: item.product._id.toString(),
          quantity: item.quantity
        })))
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: totalAmount
    });
  } catch (error) {
    res.status(500).json({ message: 'Stripe PaymentIntent Creation Error: ' + error.message });
  }
});

// @route   POST /api/payments/confirm
// @desc    Confirm successful payment, decrement stocks, log sales and alert workspaces
router.post('/payments/confirm', protect, async (req, res) => {
  try {
    const { payment_intent_id } = req.body;

    if (!payment_intent_id) {
      return res.status(422).json({ message: 'Validation failed: payment_intent_id is required.' });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ message: 'Payment has not succeeded yet. Current status: ' + paymentIntent.status });
    }

    const items = JSON.parse(paymentIntent.metadata.items);
    const salesCreated = [];

    // Loop through purchased items
    for (const itemData of items) {
      const product = await ListedProduct.findById(itemData.id);
      
      if (!product) {
        console.error(`Product list not found for confirm purchase: ${itemData.id}`);
        continue;
      }

      const amount = product.price * itemData.quantity;
      const adminCommission = amount * 0.10;
      const sellerEarnings = amount * 0.90;

      const sale = await Sale.create({
        listedProduct: product._id,
        seller: product.user,
        buyer: req.user?._id,
        amount,
        admin_commission: adminCommission,
        seller_earnings: sellerEarnings,
        status: 'processing'
      });

      // Decrement quantity
      product.quantity = Math.max(0, product.quantity - itemData.quantity);
      await product.save();

      salesCreated.push(sale);

      // Trigger Workspace Notifications
      // 1. Notification to Shopper (Buyer)
      if (req.user) {
        await Notification.create({
          user: req.user._id,
          title: 'Order Confirmed',
          content: `Thank you! Your purchase of "${product.title}" (x${itemData.quantity}) has been successfully processed.`,
          type: 'purchase'
        });
      }

      // 2. Notification to Partner Seller
      await Notification.create({
        user: product.user,
        title: 'Product Purchased',
        content: `Great news! Customer "${req.user ? req.user.name : 'A buyer'}" purchased your product "${product.title}" (x${itemData.quantity}). Net Earnings: ₹${sellerEarnings.toFixed(2)}.`,
        type: 'purchase'
      });

      // 3. Notification to Admin
      await Notification.create({
        user: null,
        title: 'New Order Placed',
        content: `Customer "${req.user ? req.user.name : 'A buyer'}" purchased "${product.title}" from Seller ID ${product.user}. Amount: ₹${amount.toFixed(2)}, Admin Commission: ₹${adminCommission.toFixed(2)}.`,
        type: 'purchase'
      });
    }

    res.json({
      message: 'Order completed and payment verified successfully.',
      sales: salesCreated.map(s => ({
        id: s._id,
        listed_product_id: s.listedProduct,
        seller_id: s.seller,
        buyer_id: s.buyer,
        amount: s.amount,
        status: s.status,
        created_at: s.createdAt
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Order confirmation process failed: ' + error.message });
  }
});

// @route   GET /api/payments/orders
// @desc    Get order history for customer
router.get('/payments/orders', protect, async (req, res) => {
  try {
    const orders = await Sale.find({ buyer: req.user._id })
      .populate('seller', 'name')
      .populate({
        path: 'listedProduct',
        populate: { path: 'design' }
      })
      .sort({ createdAt: -1 });

    const serializedOrders = orders.map(sale => {
      const productTitle = sale.listedProduct?.title || 'Printed Leather Item';
      const productPrice = sale.listedProduct?.price || sale.amount;
      const productDesc = sale.listedProduct?.description || '';
      const aiImage = sale.listedProduct?.design?.ai_image || '';

      return {
        id: sale._id,
        amount: sale.amount,
        status: sale.status,
        created_at: sale.createdAt.toISOString(),
        product: {
          id: sale.listedProduct?._id || null,
          title: productTitle,
          price: productPrice,
          description: productDesc,
          image: aiImage
        },
        seller: {
          name: sale.seller?.name || 'Partner Seller'
        }
      };
    });

    res.json({ orders: serializedOrders });
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving customer orders: ' + error.message });
  }
});

export default router;
