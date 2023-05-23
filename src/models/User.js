import mongoose from 'mongoose';

const schema = {
  firstName: String,
  lastName: String,
  email: {type: String, index: true, unique: true},
  password: String,
  avatar: String,
  createdAt: Date,
  role: {
    type: String,
    required: true,
    default: 'customer',
    enum: ['customer', 'admin']
  }
};

export const User = mongoose.model('User', new mongoose.Schema(schema, {timestamps: true}));
