# LeatherCraft — Premium MERN Leather Marketplace

> A premium custom leather goods marketplace built with React (Vite), Express, Node.js, and MongoDB (MERN). Sellers upload leather product templates, generate custom printed designs via a canvas-based Design Studio, and list them for sale. Customers browse the catalog, place orders, and pay securely via Stripe. Admins moderate listings and track revenue.

---

## 🏗️ Project Structure

```
LeatherCraft/
├── client/     → Single Page Application containing Client, Seller, and Admin portals (React 19 + Vite + Tailwind v3 + Zustand)
└── backend/    → Node.js + Express REST API (MongoDB + Mongoose + JWT + Stripe)
```

---

## ✨ Features

### 🛍️ Client (Storefront)
- Browse all approved marketplace listings.
- View product detail pages with seller info and pricing (₹ INR).
- Add items to cart and check out securely via Stripe Escrow.
- User registration and login (with Customer vs. Seller access constraints).
- Real-time notifications and purchase history.

### 🎨 Seller Portal & Design Studio
- Live dashboard displaying sales, active designs, and commission-free revenue trackers.
- **Design Studio**: Premium canvas editor (powered by Fabric.js) allowing sellers to layer colors, custom text, shapes, and images over base templates (Wallets, Bags, Jackets).
- Granular undo/redo history, canvas alignment snapping, and export features.
- Submit customized designs to the admin moderation queue for listing.

### 🛡️ Admin Vault
- Moderator console to approve or reject pending product listings.
- Global sales ledger displaying commissions and transaction details.
- Order management console (Pending → Shipped → Delivered).
- Manage and monitor registered partner seller stores.

---

## 🚀 Local Development

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance
- Stripe account (for testing API keys)

### 1. Setup Backend (Node.js/Express)

```bash
cd backend
npm install
```

Configure your `backend/.env` file:
```env
PORT=8000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
AI_API_KEY=your_huggingface_or_ai_key
STRIPE_SECRET=sk_test_...
```

Run the backend:
```bash
npm run dev
```

The server seeds the default admin, seller, and client accounts upon first connection and runs on **http://localhost:8000**.

### 2. Setup Frontend (React SPA)

```bash
cd client
npm install
```

Configure your `client/.env` file:
```env
VITE_STRIPE_KEY=pk_test_...
VITE_API_BASE_URL=/api
```

Run the client:
```bash
npm run dev
```

The frontend uses Vite's built-in development proxy to forward `/api` and `/storage` requests to the local backend and runs on **http://localhost:5173**.

### 3. Run Everything Simultaneously (Monorepo Root)

From the root directory, you can start both the backend and client concurrently:
```bash
npm run dev
```

---

## 🌎 Deployment Guide

This MERN application is structured to be deployed with the frontend on **Vercel** and the backend on **Render**.

### 1. Backend on Render
1. Create a new **Web Service** on Render.
2. Link your Git repository.
3. Configure the settings:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add your Environment Variables in the Render Dashboard (matching `backend/.env`).
5. **Persistent Storage (Optional but Recommended)**: Because Render has an ephemeral filesystem, uploaded assets (product templates/saved designs) will reset on redeployment. Attach a **Persistent Disk** on Render mounted at `/opt/render/project/src/backend/storage/app/public` (or adjust the directory mount point) if you want uploads to persist across service restarts.

### 2. Frontend on Vercel
1. Create a new project on Vercel and link your Git repository.
2. Configure the project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add Environment Variables in the Vercel Dashboard:
   - `VITE_API_BASE_URL`: `https://your-render-backend-url.onrender.com/api`
   - `VITE_STRIPE_KEY`: `pk_test_your_stripe_publishable_key`
4. Deploy. The `vercel.json` file inside the `client` directory ensures React Router's SPA routing works smoothly without throwing 404 errors on page refreshes.

---

## 📜 License

MIT License — Built for demonstration and luxury e-commerce SaaS experimentation.
