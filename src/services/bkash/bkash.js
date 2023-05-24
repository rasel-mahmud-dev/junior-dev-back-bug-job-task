/**
 * !! ATTENTION PLEASE !!
 * Please refer to the documentation at https://developer.bka.sh for information on bKash.
 */
import {createPayment, executePayment, status} from './bkash.entity';
import Bkash from './bkash.functions';
import {auth} from '../../middleware/auth';

export default async function bkash() {

  const {username, password, appKey, appSecret, isSandbox} = this.config.bkash;

  const bkashInstance = await Bkash.init(username, password, appKey, appSecret, isSandbox);


  // Routes
  this.route.post('/bkash/createPayment', auth, createPayment({...this, bkash: bkashInstance}));
  this.route.get('/bkash/execute', executePayment({...this, bkash: bkashInstance}));
  this.route.get('/bkash/status', auth, status({...this, bkash: bkashInstance}));
}
