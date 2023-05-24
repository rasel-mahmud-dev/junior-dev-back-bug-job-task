/**
 * !! ATTENTION PLEASE !!
 * Please refer to the documentation at https://developer.bka.sh for information on bKash.
 */
import fetch from '../../utils/fetch';
import settings from '../../../settings.json';

class BaseClass {
  sandbox = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout';
  live = 'https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout';

  constructor(username, password, appKey, appSecret, isDev) {
    this.username = username;
    this.password = password;
    this.appKey = appKey;
    this.appSecret = appSecret;
    this.baseUrl = isDev ? this.sandbox : this.live;
  }

  static async init(username, password, appKey, appSecret, isDev) {
    const o = new BaseClass(username, password, appKey, appSecret, isDev);
    await o.grantToken();
    return o;
  }

  async grantToken() {
    try {
      let url = this.baseUrl + '/token/grant';
      let headers = {
        username: this.username,
        password: this.password,
      };

      let data = {
        app_key: this.appKey,
        app_secret: this.appSecret,
      };

      let res = await fetch({
        method: 'POST',
        url, headers, data
      });

      if (res?.statusCode === '0000') {
        this.token = res?.id_token;
        this.tokenType = res?.token_type;
        this.refreshToken = res?.refresh_token;
      }

      return res;
    } catch (e) {
      throw new Error(e.message);
    }
  }



  async executeAgreement(paymentID = '') {
    try {
      let url = this.baseUrl + '/execute';
      let headers = {accept: 'application/json', authorization: this.token, 'X-App-Key': this.appKey};
      return await fetch({method: 'POST', url, headers, data: {paymentID}});
    } catch (error) {
      throw error;
    }
  }



  async createPayment({amount, email, clientRedirect, merchantInvoiceNumber, payerReference, currency='BDT', intent = 'sale'}) {
    
    let url = this.baseUrl + '/create';
    
    try {
      let callbackURL = `${settings.api}/api/bkash/execute/?email=${email}&totalPrice=${amount}&currency=${currency}&clientRedirect=${clientRedirect}`;

      let data = {
        mode: '0011',
        payerReference: payerReference,
        callbackURL: callbackURL,
        merchantInvoiceNumber,
        amount: String(amount),
        currency,
        intent: intent,
      };

      let headers = {Authorization: this.token, 'X-App-Key': this.appKey};

      return fetch({method: 'POST', url, headers, data});
    } catch (e) {
      throw e;
    }
  }


  async executePayment({paymentID}) {
    try {
      let url = this.baseUrl + '/execute';
      let data = {paymentID: paymentID};
      let headers = {Authorization: this.token, 'X-APP-Key': this.appKey};
      return await fetch({method: 'POST', url, headers, data});
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async queryPayment(paymentID) {
    try {
      let url = this.baseUrl + '/payment/status';
      let data = {paymentID};
      let headers = {Authorization: this.token, 'X-APP-Key': this.appKey};
      return await fetch({method: 'POST', url, headers, data});
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async paymentStatus(paymentID) {
    try {
      let url = this.baseUrl + '/payment/status';
      let data = {paymentID};
      let headers = {Authorization: this.token, 'X-APP-Key': this.appKey};
      return await fetch({method: 'POST', url, headers, data});
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async searchTransaction(trxID) {
    try {
      let url = this.baseUrl + '/general/searchTransaction';
      let data = {trxID};
      let headers = {Authorization: this.token, 'X-APP-Key': this.appKey};
      return await fetch({method: 'POST', url, headers, data});
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async searchTransactionDetails() {
    try {
      let url = this.baseUrl + '/general/searchTransaction';
      let headers = {
        Authorization: this.token,
        'X-APP-Key': this.appKey,
      };
      let data = {trxID: this.trxID};
      return await fetch({method: 'POST', url, headers, data});
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

class Bkash extends BaseClass {
  constructor(username, password, appKey, appSecret, isDev) {
    super(username, password, appKey, appSecret, isDev);
  }
}

export default Bkash;
