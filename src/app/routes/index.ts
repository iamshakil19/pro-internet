import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { PackageRoutes } from '../modules/package/package.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { FeedbackRoutes } from '../modules/feedback/feedback.routes';
import { FaqRoutes } from '../modules/faq/faq.routes';
import { BlogRoutes } from '../modules/blog/blog.routes';

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
  {
    path: "/faq",
    routes: FaqRoutes
  },
  {
    path: "/blog",
    routes: BlogRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
