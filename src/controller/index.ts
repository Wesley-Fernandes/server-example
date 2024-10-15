import Repository from '../repository';
import { AuthController } from './authentication';

class Controller {
  public db: Repository;
  public auth: AuthController;

  constructor() {
    this.db = new Repository();
    this.auth = new AuthController(this.db);
  }
}
export default Controller;
