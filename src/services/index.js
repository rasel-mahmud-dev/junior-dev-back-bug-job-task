import bkash from './bkash/bkash';
import auth from './auth';

export const services = (app) => {
  app.configure(bkash);
  app.configure(auth);
};
