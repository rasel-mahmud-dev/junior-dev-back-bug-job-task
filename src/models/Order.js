import mongoose from 'mongoose';

const schema = {
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      title: String,
      thumb: String,
      price: Number,
    }
  ],
  totalPrice: Number,
  invoiceNumber: String,
  paymentID: String,
  isPaid: Boolean,
  address: String,
  phone: Number,
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
};

export const Order = mongoose.model('Order', new mongoose.Schema(schema, {timestamps: true}));
