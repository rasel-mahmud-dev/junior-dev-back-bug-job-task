import bkash from './bkash/bkash';
import auth from './auth';
import products from './products';
import cart from './cart';

export const services = (app) => {
  app.configure(bkash);
  app.configure(auth);
  app.configure(products);
  app.configure(cart);
};
