import bkash from './bkash/bkash';
import auth from './auth';
import products from './products';
import cart from './cart';
import orders from './orders';
import transactions from './transactions';

export const services = (app) => {
  app.configure(bkash);
  app.configure(auth);
  app.configure(products);
  app.configure(cart);
  app.configure(orders);
  app.configure(transactions);
};
