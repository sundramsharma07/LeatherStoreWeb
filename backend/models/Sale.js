import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  listedProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ListedProduct',
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  amount: {
    type: Number,
    required: true,
  },
  admin_commission: {
    type: Number,
    required: true,
  },
  seller_earnings: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['confirmed', 'processing', 'shipped', 'delivered'],
    default: 'processing',
  }
}, {
  timestamps: true,
});

const Sale = mongoose.model('Sale', saleSchema);
export default Sale;
