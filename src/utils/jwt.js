import jwt from 'jsonwebtoken';
import settings from '../../settings.json';

export const createToken = (user_id, email, role) => {
  return jwt.sign(
    {
      user_id: user_id,
      email: email,
      role: role,
    },
    settings.JWT_SECRET,
    {expiresIn: '7d'}
  );
};

export const parseToken = (token) => {
  return new Promise((resolve, reject) => {
    try {
      if (token) {
        let d = jwt.verify(token, settings.JWT_SECRET);
        resolve(d);
      } else {
        reject(new Error('Token not found'));
      }
    } catch (ex) {
      reject(ex);
    }
  });
};
