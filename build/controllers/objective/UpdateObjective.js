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
exports.completeObjective = void 0;
const DBSchema_1 = require("../../schema/DBSchema");
const completeObjective = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    const { uid } = req.headers;
    DBSchema_1.User.findOne({ _id: uid }, {}, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (err) {
            res.status(400).json({ status: 'failed', message: err.message });
        }
        else {
            if (results) {
                const { developmentgoals, performancegoals } = results;
                if (data.type === 'development goal') {
                    const target = developmentgoals.find((item) => item._id == data.id);
                    if (target) {
                        const updateCompletion = {
                            _id: target._id,
                            type: target.type,
                            fields: Object.assign(Object.assign({}, target.fields), { development: Object.assign(Object.assign({}, (_a = target.fields) === null || _a === void 0 ? void 0 : _a.development), { status: 'completed' }) }),
                        };
                        const removeTarget = developmentgoals.filter((item) => item._id != target._id);
                        const ack = yield DBSchema_1.User.updateOne({ _id: uid }, { developmentgoals: [...removeTarget, updateCompletion] });
                        res.status(200).json({ status: 'success', data: ack });
                    }
                }
                else {
                    const target = performancegoals.find((item) => item._id == data.id);
                    if (target) {
                        const updateCompletion = {
                            _id: target._id,
                            type: target.type,
                            fields: Object.assign(Object.assign({}, target.fields), { performance: Object.assign(Object.assign({}, (_b = target.fields) === null || _b === void 0 ? void 0 : _b.performance), { status: 'completed' }) }),
                        };
                        const removeTarget = performancegoals.filter((item) => item._id != target._id);
                        const ack = yield DBSchema_1.User.updateOne({ _id: uid }, { performancegoals: [...removeTarget, updateCompletion] });
                        res.status(200).json({ status: 'success', data: ack });
                    }
                }
            }
        }
    }));
});
exports.completeObjective = completeObjective;
