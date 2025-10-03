import { isLoggedIn } from './auth';

export default function checkLogin() {
  return isLoggedIn();
}
