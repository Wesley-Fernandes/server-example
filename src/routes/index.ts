import { Router } from 'express';
import auth_routes from './auth-routes';
import user_routes from './user-routes';
import admin_routes from './admin-routes';
import history_routes from './history-routes';
import chapter_routes from './chapter-routes';

const routes = Router();

routes.use('/auth', auth_routes);
routes.use('/user', user_routes);
routes.use('/admin', admin_routes);
routes.use('/history', history_routes);
routes.use('/chapter', chapter_routes);

export default routes;
