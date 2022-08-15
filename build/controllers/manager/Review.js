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
exports.appraiseReview = exports.getReviews = void 0;
const mongoose_1 = require("mongoose");
const DBSchema_1 = require("../../schema/DBSchema");
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.headers;
    try {
        const myReviews = yield DBSchema_1.Review.find({ managerId: uid });
        if (myReviews) {
            res.status(200).json({ status: 'success', data: myReviews });
        }
    }
    catch (error) {
        if (error instanceof mongoose_1.MongooseError) {
            res.status(400).json({ status: 'failed', message: error.message });
        }
    }
});
exports.getReviews = getReviews;
const appraiseReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    const { uid } = req.headers;
    DBSchema_1.Review.deleteOne({ _id: data._id }, {}, (err) => {
        if (err) {
            res.status(400).json({ message: err.message });
        }
    });
    DBSchema_1.Manager.findOne({ _id: uid }, {}, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.status(400).json({ status: 'failed', message: err.message });
        }
        else {
            if (results) {
                const updateHistory = yield DBSchema_1.Manager.updateOne({ _id: uid }, { history: [...results.history, data] });
                res.status(200).json({ status: 'success', data: updateHistory });
            }
        }
    }));
});
exports.appraiseReview = appraiseReview;
