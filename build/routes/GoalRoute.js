"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CreateObjective_1 = require("../controllers/objective/CreateObjective");
const GetObjective_1 = require("../controllers/objective/GetObjective");
const UpdateObjective_1 = require("../controllers/objective/UpdateObjective");
const Review_1 = require("../controllers/user/Review");
const VerifyToken_1 = require("../middleware/VerifyToken");
const router = express_1.default.Router();
router.post('/create_development_goal', VerifyToken_1.authenticate, CreateObjective_1.createDevelopmentGoal);
router.post('/create_performance_goal', VerifyToken_1.authenticate, CreateObjective_1.createPerformanceGoal);
router.post('/complete_goal', VerifyToken_1.authenticate, UpdateObjective_1.completeObjective);
router.post('/submit_review', VerifyToken_1.authenticate, Review_1.submitReview);
router.get('/get_goals', VerifyToken_1.authenticate, GetObjective_1.getGoal);
router.get('/get_feedback', VerifyToken_1.authenticate, GetObjective_1.getFeedback);
exports.default = router;
