"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = exports.Review = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DevelopmentGoalSchema = new mongoose_1.default.Schema({
    type: String,
    fields: {
        development: { status: String, data: [String] },
        support: { status: String, data: [String] },
        activity: { status: String, data: [String] },
        comments: { status: String, data: [String] },
    },
});
const PerformanceGoalSchema = new mongoose_1.default.Schema({
    type: String,
    fields: {
        performance: { status: String, data: [String] },
        measures: { status: String, data: [String] },
        comments: { status: String, data: [String] },
    },
});
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        unique: true,
    },
    fullname: String,
    password: String,
    role: String,
    manager: String,
    managerId: String,
    developmentgoals: [DevelopmentGoalSchema],
    performancegoals: [PerformanceGoalSchema],
});
const ReviewSchema = new mongoose_1.default.Schema({
    score: Number,
    rating: Number,
    employee: String,
    appraise: String,
    employeeId: String,
    managerId: String,
    objectiveType: String,
    developmentObjective: DevelopmentGoalSchema,
    performanceObjective: PerformanceGoalSchema,
});
const ManagerSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        unique: true,
    },
    fullname: String,
    password: String,
    role: String,
    employees: [UserSchema],
    history: [ReviewSchema],
});
exports.User = mongoose_1.default.model('Users', UserSchema);
exports.Review = mongoose_1.default.model('Reviews', ReviewSchema);
exports.Manager = mongoose_1.default.model('Managers', ManagerSchema);
