import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { BlogController } from './blog.controller';

const router = express.Router();

router.post(
    '/',
    validateRequest(BlogValidation.createBlogZodSchema),
    auth(
        ENUM_USER_ROLE.ADMIN,
    ),
    BlogController.createBlog
);
router.get(
    '/',
    BlogController.getAllBlog
);
router.get(
    '/:id',
    BlogController.getSingleBlog
);
router.patch(
    '/:id',
    validateRequest(BlogValidation.updateBlogZodSchema),
    auth(
        ENUM_USER_ROLE.ADMIN,
    ),
    BlogController.updateBlog
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BlogController.deleteBlog);

export const BlogRoutes = router;