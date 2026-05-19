import express from 'express';
import Notification from '../models/Notification.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const serializeNotification = (n) => {
  return {
    id: n._id,
    user_id: n.user,
    title: n.title,
    content: n.content,
    type: n.type,
    is_read: n.is_read,
    created_at: n.createdAt,
    updated_at: n.updatedAt
  };
};

// @route   GET /api/notifications
// @desc    Get all notifications for current user/admin role
router.get('/notifications', protect, async (req, res) => {
  try {
    const user = req.user;
    let query = {};

    if (user.role === 'admin') {
      // Admins fetch global admin notifications (user is null)
      query = { user: null };
    } else {
      // Shoppers and Sellers fetch their owned notifications
      query = { user: user._id };
    }

    const notifications = await Notification.find(query).sort({ createdAt: -1 });
    const serialized = notifications.map(n => serializeNotification(n));

    res.json({
      success: true,
      notifications: serialized
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
});

// @route   PATCH /api/notifications/read-all
// @desc    Mark all notifications as read
router.patch('/notifications/read-all', protect, async (req, res) => {
  try {
    const user = req.user;
    let query = { is_read: false };

    if (user.role === 'admin') {
      query.user = null;
    } else {
      query.user = user._id;
    }

    await Notification.updateMany(query, { $set: { is_read: true } });

    res.json({
      success: true,
      message: 'All notifications marked as read.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
});

// @route   PATCH /api/notifications/:id/read
// @desc    Mark single notification as read
router.patch('/notifications/:id/read', protect, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found.' });
    }

    // Security check
    if (req.user.role !== 'admin' && notification.user && notification.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized action.' });
    }

    notification.is_read = true;
    await notification.save();

    res.json({
      success: true,
      notification: serializeNotification(notification)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
});

export default router;
