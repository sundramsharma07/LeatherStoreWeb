import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import User from './models/User.js';

// Route Imports
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import designRoutes from './routes/designs.js';
import listedProductRoutes from './routes/listedProducts.js';
import adminRoutes from './routes/admin.js';
import notificationRoutes from './routes/notifications.js';
import paymentRoutes from './routes/payments.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storageRoot = path.join(__dirname, 'storage/app/public');

const app = express();

// CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5175',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(null, true); // allow all during dev
  },
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Static uploads folder
try {
  fs.mkdirSync(storageRoot, { recursive: true });
} catch (error) {
  console.error(`⚠️ Failed to prepare upload storage: ${error.message}`);
}
app.use('/storage', express.static(path.join(__dirname, 'public/storage')));

// API Routes
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', designRoutes);
app.use('/api', listedProductRoutes);
app.use('/api', adminRoutes);
app.use('/api', notificationRoutes);
app.use('/api', paymentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', db: 'mongodb', stack: 'mern' });
});

// Seed admin and test users
async function seedAccounts() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const exists = await User.findOne({ email: adminEmail });
    if (!exists) {
      await User.create({
        name: 'Store Admin',
        email: adminEmail,
        password: process.env.ADMIN_PASSWORD || 'password',
        role: 'admin',
      });
      console.log(`✅ Admin account seeded: ${adminEmail}`);
    } else {
      console.log(`✅ Admin account already exists.`);
    }

    const sellerEmail = 'seller@example.com';
    const sellerExists = await User.findOne({ email: sellerEmail });
    if (!sellerExists) {
      await User.create({
        name: 'Siddharth Roy',
        email: sellerEmail,
        password: 'password',
        role: 'seller',
      });
      console.log(`✅ Seller account seeded: ${sellerEmail}`);
    }

    const customerEmail = 'customer@example.com';
    const customerExists = await User.findOne({ email: customerEmail });
    if (!customerExists) {
      await User.create({
        name: 'Amrit Raj',
        email: customerEmail,
        password: 'password',
        role: 'client',
      });
      console.log(`✅ Customer account seeded: ${customerEmail}`);
    }

  } catch (err) {
    console.error('⚠️  Seed failed:', err.message);
  }
}

// Start
const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  seedAccounts();
  app.listen(PORT, () => {
    console.log(`🚀 MERN backend running on http://localhost:${PORT}`);
  });
});
