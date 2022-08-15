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
exports.createPerformanceGoal = exports.createDevelopmentGoal = void 0;
const mongoose_1 = require("mongoose");
const DBSchema_1 = require("../../schema/DBSchema");
const createDevelopmentGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { developmentGoal } = req.body;
    const { uid } = req.headers;
    try {
        const currentUser = yield DBSchema_1.User.findOne({ _id: uid });
        if (currentUser) {
            const newDevGoal = yield DBSchema_1.User.updateOne({ _id: uid }, { developmentgoals: [...currentUser.developmentgoals, developmentGoal] });
            res.status(200).json({ status: 'success', data: newDevGoal });
        }
    }
    catch (error) {
        if (error instanceof mongoose_1.MongooseError) {
            res.status(400).json({ status: 'failed', message: error.message });
        }
    }
});
exports.createDevelopmentGoal = createDevelopmentGoal;
const createPerformanceGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { performanceGoal } = req.body;
    const { uid } = req.headers;
    try {
        const currentUser = yield DBSchema_1.User.findOne({ _id: uid });
        if (currentUser) {
            const newDevGoal = yield DBSchema_1.User.updateOne({ _id: uid }, { performancegoals: [...currentUser.performancegoals, performanceGoal] });
            res.status(200).json({ status: 'success', data: newDevGoal });
        }
    }
    catch (error) {
        if (error instanceof mongoose_1.MongooseError) {
            res.status(400).json({ status: 'failed', message: error.message });
        }
    }
});
exports.createPerformanceGoal = createPerformanceGoal;
