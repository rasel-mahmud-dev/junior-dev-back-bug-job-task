import {auth} from '../middleware/auth';
import { getAllOrders} from '../controllers/orders';


export default function orders() {
  this.route.get('/orders', auth, getAllOrders);
}
