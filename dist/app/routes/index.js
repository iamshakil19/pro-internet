"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const package_routes_1 = require("../modules/package/package.routes");
const user_routes_1 = require("../modules/user/user.routes");
const feedback_routes_1 = require("../modules/feedback/feedback.routes");
const faq_routes_1 = require("../modules/faq/faq.routes");
const blog_routes_1 = require("../modules/blog/blog.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const rating_routes_1 = require("../modules/rating/rating.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        routes: auth_routes_1.AuthRoutes
    },
    {
        path: "/package",
        routes: package_routes_1.PackageRoutes
    },
    {
        path: "/user",
        routes: user_routes_1.UserRoutes
    },
    {
        path: "/feedback",
        routes: feedback_routes_1.FeedbackRoutes
    },
    {
        path: "/faq",
        routes: faq_routes_1.FaqRoutes
    },
    {
        path: "/blog",
        routes: blog_routes_1.BlogRoutes
    },
    {
        path: "/booking",
        routes: booking_routes_1.BookingRoutes
    },
    {
        path: "/rating",
        routes: rating_routes_1.RatingRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
