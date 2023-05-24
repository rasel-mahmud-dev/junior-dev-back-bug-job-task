import {Transaction} from '../models/Transaction';
import mongoose from 'mongoose';


export async function getAllTransactions(req, res) {
  try {
    let transactions = await Transaction.find({customerId: req.user.user_id});
    res.status(200).json({status: 'ok', items: transactions});


  } catch (ex) {
    res.status(500).json({message: 'transactions fetch fail'});
  }
}


export async function getAllOrderDetail(req, res) {

  const {transactionId} = req.params;
  try {
    let transaction = await Transaction.aggregate([
      {
        $match: {
          transactionId: transactionId,
          customerId: mongoose.Types.ObjectId(req.user.user_id)
        }
      },
      {
        $lookup: {
          from: 'orders',
          localField: 'orderId',
          foreignField: '_id',
          as: 'order'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'customerId',
          foreignField: '_id',
          as: 'customer'
        }
      },
      {$unwind: {path: '$order', preserveNullAndEmptyArrays: true}},
      {$unwind: {path: '$customer', preserveNullAndEmptyArrays: true}},
      {
        $set: {
          email: '$customer.email',
          phone: '$order.phone',
          orderId: '$order._id',
          address: '$order.email',
          invoiceNumber: '$order.invoiceNumber'
        }
      },
      {
        $group: {
          email: 1,
          phone: 1,
          address: 1,
          orderId: 1,
          invoiceNumber: 1,
        }
      }
    ]);

    res.status(200).json({status: 'ok', data: transaction});


  } catch (ex) {
    res.status(500).json({message: 'transactions fetch fail'});
  }
}


