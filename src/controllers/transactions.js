import {Transaction} from '../models/Transaction';


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
          // customerId: mongoose.Types.ObjectId(req.user.user_id)
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
          'email': '$customer.email',
          'phone': '$order.phone',
          'orderId': '$order._id',
          'address': '$order.address',
          'invoiceNumber': '$order.invoiceNumber'
        }
      },
      {
        $project: {
          email: 1,
          phone: 1,
          address: 1,
          orderId: 1,
          invoiceNumber: 1,
        }
      }
    ]);

    if (transaction && transaction[0]) {
      res.status(200).json({status: 'ok', data: transaction[0]});
    } else {
      res.status(200).json({status: 'ok', data: null});
    }

  } catch (ex) {
    res.status(500).json({message: 'transactions fetch fail'});
  }
}


