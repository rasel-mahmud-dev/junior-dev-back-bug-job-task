import {addProduct, getAllProducts, getProductDetail} from '../controllers/prouducts';
import {auth} from '../middleware/auth';


export default function products() {
  this.route.get('/products', getAllProducts);
  this.route.post('/products', auth, addProduct);
  this.route.get('/products/:productId', getProductDetail);
}
