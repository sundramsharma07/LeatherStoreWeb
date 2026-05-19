import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const issueToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || 'csdhsvdgsgdhsdfsgdhr36rgd',
    { expiresIn: '30d' }
  );
};

const serializeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  addresses: user.addresses || [],
  role: user.role,
});

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(422).json({ message: 'Name, email and password are required.' });
    }

    const finalRole = ['client', 'seller'].includes(role) ? role : 'client';

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(422).json({ message: 'The email has already been taken.' });
    }

    const user = await User.create({ name, email: email.toLowerCase(), password, role: finalRole });

    res.status(201).json({ token: issueToken(user), user: serializeUser(user) });
  } catch (err) {
    res.status(500).json({ message: 'Registration error: ' + err.message });
  }
});

// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(422).json({
        message: 'The provided credentials are incorrect.',
        errors: { email: ['These credentials do not match our records.'] },
      });
    }

    res.json({ token: issueToken(user), user: serializeUser(user) });
  } catch (err) {
    res.status(500).json({ message: 'Login error: ' + err.message });
  }
});

// GET /api/user
router.get('/user', protect, (req, res) => {
  res.json({ user: serializeUser(req.user) });
});

// PUT /api/user
router.put('/user', protect, async (req, res) => {
  try {
    const { name, email, phone, addresses, password } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: 'User not found.' });

    if (email && email.toLowerCase() !== user.email) {
      const taken = await User.findOne({ email: email.toLowerCase() });
      if (taken) return res.status(422).json({ message: 'The email has already been taken.' });
      user.email = email.toLowerCase();
    }

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (addresses !== undefined) user.addresses = addresses;
    if (password) user.password = password;

    await user.save();

    res.json({ message: 'Profile updated successfully.', user: serializeUser(user) });
  } catch (err) {
    res.status(500).json({ message: 'Update error: ' + err.message });
  }
});

export default router;
