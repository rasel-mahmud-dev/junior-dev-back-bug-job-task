
import {Order} from '../models/Order';


export async function getAllOrders(req, res) {
  try {

    let orders = await Order.find({customerId: req.user.user_id});
    res.status(200).json({status: 'ok', items: orders});


  } catch (ex) {
    res.status(500).json({message: 'Order fetch fail'});
  }
}


