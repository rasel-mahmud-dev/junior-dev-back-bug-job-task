import {Cart} from '../models/Cart';
import mongoose from 'mongoose';


export async function getAllCartProducts(req, res) {
  try {

    let carts = await Cart.aggregate([
      {
        $match: {
          customerId: mongoose.Types.ObjectId(req.user.user_id)
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: {
          path: '$product', preserveNullAndEmptyArrays: true,
        }
      },
      {
        $set: {
          title: '$product.title',
          price: '$product.price',
          thumb: '$product.thumb',
        }
      },
      {
        $project: {
          product: 0
        }
      }
    ]);


    res.status(200).json(carts);


  } catch (ex) {
    res.status(500).json({message: 'Cart Product fetch fail'});
  }
}


export async function addToCart(req, res) {
  try {

    const {
      productId,
      quantity = 1
    } = req.body;

    let cart = await Cart.findOne({productId});
    if (cart) {
      return res.status(422).json({message: 'Product Already has on Cart'});
    }

    let newCart = new Cart({
      productId,
      quantity,
      customerId: req.user.user_id,
    });

    newCart = await newCart.save();

    res.status(201).json(newCart);

  } catch (ex) {
    return res.status(500).json({message: 'Internal Error'});
  }
}
