import {auth} from '../middleware/auth';
import {addToCart, getAllCartProducts, removeFromCart} from '../controllers/carts';


export default function cart() {
  this.route.get('/carts', auth, getAllCartProducts);
  this.route.post('/carts', auth, addToCart);
  this.route.delete('/carts/:productId', auth, removeFromCart);
}
