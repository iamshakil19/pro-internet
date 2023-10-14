import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { PackageRoutes } from '../modules/package/package.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    routes: AuthRoutes
  },
  {
    path: "/package",
    routes: PackageRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
