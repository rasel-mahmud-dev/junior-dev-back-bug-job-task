import bkash from './bkash/bkash';
import auth from './auth';
import products from './products';

export const services = (app) => {
  app.configure(bkash);
  app.configure(auth);
  app.configure(products);
};
