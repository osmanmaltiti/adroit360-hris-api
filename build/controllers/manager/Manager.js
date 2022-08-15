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
exports.getManagerProfile = exports.getManager = exports.createManager = void 0;
const mongoose_1 = require("mongoose");
const CreateToken_1 = require("../../helpers/CreateToken");
const Encryption_1 = require("../../helpers/Encryption");
const DBSchema_1 = require("../../schema/DBSchema");
const createManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, fullname, password, role } = req.body;
    if (email && password) {
        const hashPassword = (0, Encryption_1.encryptPassword)(password);
        try {
            const newManager = new DBSchema_1.Manager({
                role,
                email,
                fullname,
                password: hashPassword,
            });
            const createdManager = yield newManager.save();
            const token = yield (0, CreateToken_1.createToken)(createdManager.email, createdManager.role);
            res
                .status(200)
                .json({ status: 'success', data: { uid: createdManager._id, token } });
        }
        catch (error) {
            res
                .status(400)
                .json({ status: 'failed', message: 'email already exists' });
        }
    }
});
exports.createManager = createManager;
const getManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const currentUser = yield DBSchema_1.Manager.findOne({ email });
        if (currentUser) {
            const verifyPassword = (0, Encryption_1.comparePassword)(password, String(currentUser.password));
            if (verifyPassword) {
                const token = yield (0, CreateToken_1.createToken)(currentUser.email, currentUser.role);
                res
                    .status(200)
                    .json({ status: 'success', data: { uid: currentUser._id, token } });
            }
            else {
                res
                    .status(401)
                    .send({ status: 'failed', message: 'invalid username or password' });
            }
        }
        else {
            res
                .status(401)
                .send({ status: 'failed', message: 'invalid username or password' });
        }
    }
    catch (error) {
        if (error instanceof mongoose_1.MongooseError) {
            res.status(401).json({ status: 'failed', message: error.message });
        }
    }
});
exports.getManager = getManager;
const getManagerProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.headers;
    try {
        const currentManager = yield DBSchema_1.Manager.findOne({ _id: uid }).select({
            role: true,
            history: true,
            fullname: true,
            employees: true,
        });
        if (currentManager) {
            const managerData = {
                role: currentManager.role,
                history: currentManager.history,
                fullname: currentManager.fullname,
                employees: currentManager.employees,
            };
            res.status(200).json({ status: 'success', data: managerData });
        }
    }
    catch (error) {
        if (error instanceof mongoose_1.MongooseError) {
            res.status(400).json({ status: 'failed', message: error.message });
        }
    }
});
exports.getManagerProfile = getManagerProfile;
