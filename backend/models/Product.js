import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  }
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
export default Product;
