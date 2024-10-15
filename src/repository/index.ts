import { Auth } from './auth-repository';

export default class Repository {
  auth: Auth;

  constructor() {
    this.auth = new Auth();
  }
}
