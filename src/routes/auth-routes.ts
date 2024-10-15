import { Router } from 'express';
import Controller from '../controller';
import { Protected } from '../middleware/protected';

const auth_routes = Router();
const controller = new Controller();

auth_routes.post('/register', async (req, res) => {
  await controller.auth.register(req, res);
});

auth_routes.post('/sign-in', async (req, res) => {
  await controller.auth.signIn(req, res);
});

auth_routes.post('/sign-out', Protected, async (req, res) => {
  await controller.auth.signOut(req, res);
});

auth_routes.get('/my-profile', Protected, async (req, res) => {
  await controller.auth.get(req, res);
});

export default auth_routes;
