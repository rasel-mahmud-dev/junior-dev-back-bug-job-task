import {login, register, verifyAuth} from '../controllers/auth';


export default function auth() {
  this.route.post('/auth/login', login);
  this.route.post('/auth/register', register);
  this.route.get('/auth/verify', verifyAuth);
}
