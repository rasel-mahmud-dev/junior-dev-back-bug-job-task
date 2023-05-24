import {parseToken} from '../utils/jwt';


export function auth(req, res, next) {
  let token = req.headers['authorization'] || '';

  if (!token) {
    req.user = null;
    return res.status(403).json({message: 'Please login first'});
  }
  parseToken(token)
    .then((u) => {
      req.user = {
        user_id: u.user_id,
        email: u.email,
        role: u.role,
      };
      next();
    })
    .catch(() => {
      req.user = null;
      return res.status(403).json({message: 'Please login first'});
    });
}
