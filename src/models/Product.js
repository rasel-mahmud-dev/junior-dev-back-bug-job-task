import mongoose from 'mongoose';

const schema = {
  title: String,
  price: Number,
  description: String,
  image: String,
  discount: Number,
  stock: Number,
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
};

export const Product = mongoose.model('Product', new mongoose.Schema(schema, {timestamps: true}));
