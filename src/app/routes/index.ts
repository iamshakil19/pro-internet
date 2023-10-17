import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { PackageRoutes } from '../modules/package/package.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { FeedbackRoutes } from '../modules/feedback/feedback.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    routes: AuthRoutes
  },
  {
    path: "/package",
    routes: PackageRoutes
  },
  {
    path: "/user",
    routes: UserRoutes
  },
  {
    path: "/feedback",
    routes: FeedbackRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
