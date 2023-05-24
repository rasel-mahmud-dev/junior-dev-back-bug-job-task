import mongoose from 'mongoose';

const schema = {
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    index: true,
  },
  quantity: Number,
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  }
};

export const Cart = mongoose.model('Cart', new mongoose.Schema(schema, {timestamps: true}));
