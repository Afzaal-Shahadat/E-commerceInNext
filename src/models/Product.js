import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', productSchema);