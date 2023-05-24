import {Product} from '../models/Product';

import * as yup from 'yup';

export async function getProductDetail(req, res) {
  const {productId} = req.params;
  try {
    let product = await Product.findOne({_id: productId}).populate('sellerId', 'firstName avatar');
    res.status(200).json(product);
  } catch (ex) {
    res.status(500).json({message: 'Product fetch fail'});
  }
}

export async function getAllProducts(req, res) {
  try {
    let products = await Product.find({});
    res.status(200).json(products);
  } catch (ex) {
    res.status(500).json({message: 'Product fetch fail'});
  }
}

export async function addProduct(req, res) {
  try {

    const {
      title, description, price, stock = 1, discount = 0,
      thumb = ''
    } = req.body;

    const schema = yup.object({
      title: yup.string().required('Title required').max(100).label('Title'),
      price: yup.number().required('Product price required').label('Price'),
    });


    await schema.validate(req.body);

    let newProduct = new Product({
      title,
      price,
      stock,
      description,
      discount,
      thumb,
      sellerId: req.user.user_id,
    });

    newProduct = await newProduct.save();

    res.status(201).json(newProduct);

  } catch (ex) {
    return res.status(500).json({message: 'Internal Error'});
  }
}
