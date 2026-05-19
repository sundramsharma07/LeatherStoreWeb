import mongoose from 'mongoose';

const designSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    default: null,
  },
  original_image: {
    type: String,
    default: '',
  },
  ai_image: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    default: 'Manual Design Upload',
  }
}, {
  timestamps: true,
});

const Design = mongoose.model('Design', designSchema);
export default Design;
