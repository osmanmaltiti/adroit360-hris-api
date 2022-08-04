import mongoose from 'mongoose';

const DevelopmentGoalSchema = new mongoose.Schema({
  type: String,
  fields: {
    development: { status: String, data: [String] },
    support: { status: String, data: [String] },
    activity: { status: String, data: [String] },
    comments: { status: String, data: [String] },
    score: Number,
    rating: Number,
  },
});

const PerformanceGoalSchema = new mongoose.Schema({
  type: String,
  fields: {
    performance: { status: String, data: [String] },
    measures: { status: String, data: [String] },
    comments: { status: String, data: [String] },
    score: Number,
    rating: Number,
  },
});

const UserSchema = new mongoose.Schema({
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

const ReviewSchema = new mongoose.Schema({
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

const ManagerSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  fullname: String,
  password: String,
  role: String,
  employees: [UserSchema],
  pending: [ReviewSchema],
  history: [ReviewSchema],
});

export const User = mongoose.model('Users', UserSchema);
export const Review = mongoose.model('Reviews', ReviewSchema);
export const Manager = mongoose.model('Managers', ManagerSchema);
