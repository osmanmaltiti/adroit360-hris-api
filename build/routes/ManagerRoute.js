"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Manager_1 = require("../controllers/manager/Manager");
const Review_1 = require("../controllers/manager/Review");
const VerifyToken_1 = require("../middleware/VerifyToken");
const router = express_1.default.Router();
router.post('/login', Manager_1.getManager);
router.post('/signup', Manager_1.createManager);
router.post('/appraise_review', VerifyToken_1.authenticateManager, Review_1.appraiseReview);
router.get('/get_reviews', VerifyToken_1.authenticateManager, Review_1.getReviews);
router.get('/get_profile', VerifyToken_1.authenticateManager, Manager_1.getManagerProfile);
exports.default = router;
