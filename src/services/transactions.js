
import {auth} from '../middleware/auth';
import {getAllOrderDetail, getAllTransactions} from '../controllers/transactions';

export default function transactions() {
  this.route.get('/transactions', auth, getAllTransactions);
  this.route.get('/transactions/:transactionId', auth, getAllOrderDetail);
}
