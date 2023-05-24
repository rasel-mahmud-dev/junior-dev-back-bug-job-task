/**
 * !! ATTENTION PLEASE !!
 * Please refer to the documentation at https://developer.bka.sh for information on bKash.
 */
import fs from 'fs';
import path from 'path';

import * as yup from 'yup';


export const createPayment = ({bkash}) => async (req, res) => {


  const {phone, email, totalPrice} = req.body;

  // client request payload validation
  const bodyPayloadSchema = yup.object({
    phone: yup.string().required('Please provide phone number'),
    firstName: yup.string().required('Please provide First Name')
  });


  try {

    await bodyPayloadSchema.validate(req.body);

    const createAgreement = await bkash.createAgreement({
      mode: '0000',
      payerReference: phone,
      email,
      totalPrice,
      intent: 'Sale'

    });

    res.status(200).json(createAgreement);

  } catch (error) {
    // handle error
    let errorMessage = error?.message || 'Internal Error';
    res.status(500).json({message: errorMessage});
  }
};

export const executePayment = ({bkash, mail, config}) => async (req, res) => {

  const { email, totalPrice, paymentID, clientRedirect } = req.query;


  const execute = await bkash.executeAgreement(paymentID);

  if (Number(execute.statusCode) !== 2054) {
    const crtPayment = await bkash.createPayment({
      mode: '0001', merchantAssociationInfo: 'MI05MID54RF09123456One',
      merchantInvoiceNumber: 'Inv0121', amount: totalPrice, agreementID: execute?.agreementID,
      baseURL: config.api + '/api/bkash/status?email=' + email
    });
    let createPay = await bkash.executePayment({paymentID: crtPayment.paymentID});

    // Send a Confirmation Email
    if (createPay.statusCode === '0000') {
      await mail({
        receiver: email,
        subject: 'Coding test',
        body: fs.readFileSync(path.resolve(__dirname, 'templates', 'emailTemplate.html')),
        type: 'html'
      });
    }

    // Redirect to webpage to show a modal
    return await res.redirect(crtPayment.bkashURL);
  }

  // redirect client due to payment process fail
  res.redirect(config.base + `${clientRedirect}?errorMessage=${execute.statusMessage}`);
};



export const status = ({config}) => async (req, res) => {
  let email = req.query.email;

  res.redirect(config.base + '?buy=success?email=' + email);
};
