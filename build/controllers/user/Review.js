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
exports.submitReview = void 0;
const DBSchema_1 = require("../../schema/DBSchema");
const submitReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    const { uid } = req.headers;
    DBSchema_1.User.findOne({ _id: uid }, {}, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.status(400).json({ status: 'failed', message: err.message });
        }
        else {
            if (results) {
                const { managerId, fullname } = results;
                const newReview = new DBSchema_1.Review({
                    score: 0,
                    rating: 0,
                    managerId,
                    employee: fullname,
                    appraise: 'false',
                    employeeId: uid,
                    objectiveType: data.type,
                    developmentObjective: data.type === 'development goal' ? data : null,
                    performanceObjective: data.type === 'performance goal' ? data : null,
                });
                yield newReview.save();
                DBSchema_1.User.findOne({ _id: uid }, {}, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
                    if (err) {
                        res.status(400).json({ status: 'failed', message: err.message });
                    }
                    else {
                        if (results) {
                            if (data.type === 'development goal') {
                                const removeTarget = results.developmentgoals.filter((item) => item._id != data._id);
                                const ack = yield DBSchema_1.User.updateOne({ _id: uid }, { developmentgoals: [...removeTarget] });
                                res
                                    .status(200)
                                    .json({ status: 'success', data: ack.acknowledged });
                            }
                            else {
                                const removeTarget = results.performancegoals.filter((item) => item._id != data._id);
                                const ack = yield DBSchema_1.User.updateOne({ _id: uid }, { performancegoals: [...removeTarget] });
                                res
                                    .status(200)
                                    .json({ status: 'success', data: ack.acknowledged });
                            }
                        }
                        else {
                            res
                                .status(400)
                                .json({ status: 'failed', message: 'User Not Found' });
                        }
                    }
                }));
            }
            else {
                res.status(400).json({ status: 'failed', message: 'User Not Found' });
            }
        }
    }));
});
exports.submitReview = submitReview;
