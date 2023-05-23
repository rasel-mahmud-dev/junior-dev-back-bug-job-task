import {User} from '../models/User';
import {compare, makeHash} from '../utils/bcrypt';
import {createToken, parseToken} from '../utils/jwt';

import * as yup from 'yup';



export async function login(req, res) {
  try {

    const {email, password} = req.body;

    let user = await User.findOne({email});

    if (!user) {
      return res.status(409).json({message: 'user not registered'});
    }


    let match = await compare(password, user.password);
    if (!match) {
      return res.status(409).json({message: 'Password not match'});
    }

    let token = await createToken(user._id, user.email, user.role);
    let {password: _, ...other} = user;


    res.status(201).json({
      auth: other._doc,
      token: token
    });

  } catch (ex) {
    return res.status(500).json({message: 'Internal Error'});
  }
}


export async function register(req, res) {

  try {

    const {firstName, lastName = '', email, password} = req.body;


    let user = await User.findOne({email});
    if (user) {
      return res.status(500).json({message: 'This user already registered'});
    }


    const schema = yup.object({
      firstName: yup.string().required('First Name required').max(100).label('FirstName'),
      lastName: yup.string().max(100).label('LastName'),
      email: yup.string().email().required('email required').max(100).label('Email'),
      password: yup.string().required('password required').max(100).label('Password'),
    });


    await schema.validate(req.body);


    let payload = {firstName, lastName, email, password: makeHash(password)};


    let newUser = new User({...payload});

    newUser = await newUser.save();
    if (!newUser) {
      return res.status(500).json({message: 'User registration fail'});
    }

    let token = createToken(newUser._id, newUser.email, 'USER');
    newUser._doc['password'] = null;

    res.status(201).json({
      token,
      auth: newUser._doc
    });

  } catch (ex) {
    return res.status(500).json({message: 'Internal Error'});
  }

}


export async function verifyAuth(req, res) {

  let token = req.headers['authorization'] || '';

  try {
    let data = await parseToken(token);

    if (!data) {
      return res.status(409).json({message: 'Please login first'});
    }

    let user = await User.findOne({_id: data.user_id});

    if (!user) {
      return res.status(409).json({message: 'Please login first'});
    }

    user._doc['password'] = null;

    res.status(201).json({
      ...user._doc,
    });

  } catch (ex) {
    return res.status(500).json({message: 'Internal Error'});
  }
}
