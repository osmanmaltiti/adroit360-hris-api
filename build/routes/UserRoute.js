"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../controllers/user/User");
const VerifyToken_1 = require("../middleware/VerifyToken");
const router = express_1.default.Router();
router.post('/login', User_1.getUser);
//created by line manager
router.post('/signup', VerifyToken_1.authenticateManager, User_1.createUser);
router.get('/get_profile', VerifyToken_1.authenticate, User_1.getProfile);
exports.default = router;
