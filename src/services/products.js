import {addProduct, getAllProducts, getProductDetail, searchProducts} from '../controllers/prouducts';
import {auth} from '../middleware/auth';


export default function products() {

  this.route.get('/products', getAllProducts);
  this.route.get('/products/search', searchProducts);

  this.route.post('/products', auth, addProduct);
  this.route.get('/products/:productId', getProductDetail);
}
