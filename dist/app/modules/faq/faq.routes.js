"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const faq_controller_1 = require("./faq.controller");
const faq_validation_1 = require("./faq.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(faq_validation_1.FaqValidation.createFaqZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), faq_controller_1.FaqController.createFaq);
router.get('/', faq_controller_1.FaqController.getAllFaq);
exports.FaqRoutes = router;
