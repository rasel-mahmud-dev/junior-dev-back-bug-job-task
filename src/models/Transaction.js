import mongoose from 'mongoose';

const schema = {
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  paymentID: String,
  transactionId: String,
  payerReference: String,
  amount: Number,
  currency: String,
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
};

export const Transaction = mongoose.model('Transaction', new mongoose.Schema(schema, {timestamps: true}));

