# LeatherCraft REST API — Node.js & Express Backend

This is the REST API backend for the LeatherCraft marketplace, built with Node.js, Express, MongoDB, and Mongoose.

## 🚀 Features
- **JWT Authentication & Authorization**: Roles for client, seller, and admin.
- **Base Products Catalog**: For uploading templates (wallets, bags, jackets).
- **Design Studio API**: Multer-based design saving and local storage management.
- **Moderation Queue**: Admin approval process for customized products.
- **Stripe Payments**: Integration with Stripe for secure card transactions.
- **Notifications Engine**: In-app action logs and user alerts.

## 🛠️ Tech Stack
- **Node.js** & **Express**
- **MongoDB** & **Mongoose**
- **Multer** (Local file uploads)
- **BcryptJS** (Password hashing)
- **JSONWebToken** (Session tokens)
- **Stripe SDK**

## 💻 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env` file containing:
   ```env
   PORT=8000
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your_jwt_secret_key
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your_secure_password
   AI_API_KEY=your_huggingface_or_ai_key
   STRIPE_SECRET=sk_test_...
   ```

3. **Run Dev Server**:
   ```bash
   npm run dev
   ```

4. **Production Run**:
   ```bash
   npm start
   ```

## 📂 Directory Layout
- `config/` - Database connection settings.
- `middleware/` - JWT protection and role verification handlers.
- `models/` - Mongoose schemas (User, Product, Design, ListedProduct, Sale, Notification).
- `routes/` - Express endpoint routers.
- `server.js` - Main Express server entrypoint.
