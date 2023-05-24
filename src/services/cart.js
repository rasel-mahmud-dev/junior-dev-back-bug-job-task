import {auth} from '../middleware/auth';
import {addToCart, getAllCartProducts} from '../controllers/carts';


export default function cart() {
  this.route.get('/carts', auth, getAllCartProducts);
  this.route.post('/carts', auth, addToCart);
}
