/**
 * !! ATTENTION PLEASE !!
 * Please refer to the documentation at https://developer.bka.sh for information on bKash.
 */

import * as yup from 'yup';
import uuid from '../../utils/uuid';
import {Order} from '../../models/Order';
import {Transaction} from '../../models/Transaction';
import settings from '../../../settings.json';


export const createPayment = ({bkash}) => async (req, res) => {


  const {items = [], phone, email, clientRedirect, totalPrice, address} = req.body;

  // client request payload validation
  const bodyPayloadSchema = yup.object({
    phone: yup.string().required('Please provide phone number'),
    firstName: yup.string().required('Please provide First Name')
  });


  try {

    await bodyPayloadSchema.validate(req.body);

    let merchantInvoiceNumber = uuid(12);

    const payment = await bkash.createPayment({
      mode: '0011',
      payerReference: phone,
      email,
      amount: totalPrice,
      merchantInvoiceNumber: merchantInvoiceNumber,
      intent: 'sale',
      clientRedirect: clientRedirect
    });

    if (!payment) {
      return res.status(500).json({message: 'Order fail'});
    }

    let newOrder = new Order({
      items: items,
      address,
      phone,
      totalPrice: totalPrice,
      customerId: req.user.user_id,
      invoiceNumber: merchantInvoiceNumber,
      paymentID: payment.paymentID,
      isPaid: false,
    });


    newOrder = await newOrder.save();


    res.status(201).json({
      bkashURL: payment.bkashURL,
      paymentID: payment.paymentID,
      order: newOrder
    });

  } catch (error) {
    // handle error
    let errorMessage = error?.message || 'Internal Error';
    res.status(500).json({message: errorMessage});
  }
};

export const executePayment = ({bkash, mail, config}) => async (req, res) => {

  const {paymentID, currency, clientRedirect} = req.query;

  try {


    // return await res.redirect( settings.base +  clientRedirect + '?errorMessage=Payment fail');

    // console.log(settings.base);

    const createPay = await bkash.executeAgreement(paymentID);

    // Send a Confirmation Email
    if (createPay.statusCode === '0000') {

      // create transaction record
      let order = await Order.findOne({paymentID: createPay.paymentID});

      let newTransaction = new Transaction({
        orderId: order._id,
        paymentID: createPay.paymentID,
        transactionId: createPay.trxID,
        payerReference: createPay.payerReference,
        amount: createPay.amount,
        currency: currency,
        customerId: order.customerId,
      });

      await newTransaction.save();


      // send confirmation mail
      // await mail({
      //   receiver: email,
      //   subject: 'Coding test',
      //   body: fs.readFileSync(path.resolve(__dirname, 'templates', 'emailTemplate.html')),
      //   type: 'html'
      // })

      return await res.redirect(settings.base + clientRedirect + `?transactionId=${createPay.trxID}`);


    } else if (createPay.statusCode === '2023') {
      return await res.redirect(settings.base + clientRedirect + `?errorMessage=${createPay.statusMessage}`);

    } else {
      return await res.redirect(settings.base + clientRedirect + '?errorMessage=Payment fail');
    }

  } catch (ex) {
    console.log(ex);
    return await res.redirect(settings.base + clientRedirect + '?errorMessage=Payment fail');
  }


};

// http://localhost:9000/api/bkash/execute/?email=&totalPrice=50001&clientRedirect=/checkout/646da995d0a49f5e3c4df382&paymentID=TR0011RX1684934813864&status=success&apiVersion=1.2.0-beta


export const status = ({config}) => async (req, res) => {
  let email = req.query.email;

  res.redirect(config.base + '?buy=success?email=' + email);
};
