"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedback = exports.getGoal = void 0;
const mongoose_1 = require("mongoose");
const DBSchema_1 = require("../../schema/DBSchema");
const getGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.headers;
    try {
        const currentUser = yield DBSchema_1.User.findOne({ _id: uid });
        if (currentUser) {
            const goals = [
                ...currentUser.developmentgoals,
                ...currentUser.performancegoals,
            ];
            res.status(200).json({ status: 'success', data: goals });
        }
    }
    catch (error) {
        if (error instanceof mongoose_1.MongooseError) {
            res.status(400).json({ status: 'failed', message: error.message });
        }
    }
});
exports.getGoal = getGoal;
const getFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.headers;
    try {
        const currentUser = yield DBSchema_1.User.findOne({ _id: uid });
        if (currentUser) {
            const manager = yield DBSchema_1.Manager.findOne({ _id: currentUser.managerId });
            if (manager) {
                const { history } = manager;
                const userFeedbacks = history.filter((item) => item.employeeId === uid);
                res.status(200).json({ status: 'success', data: userFeedbacks });
            }
        }
    }
    catch (error) {
        if (error instanceof mongoose_1.MongooseError) {
            res.status(400).json({ status: 'failed', message: error.message });
        }
    }
});
exports.getFeedback = getFeedback;
