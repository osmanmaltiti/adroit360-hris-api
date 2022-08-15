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
exports.getProfile = exports.getUser = exports.createUser = void 0;
const mongoose_1 = require("mongoose");
const CreateToken_1 = require("../../helpers/CreateToken");
const Encryption_1 = require("../../helpers/Encryption");
const DBSchema_1 = require("../../schema/DBSchema");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, fullname, password, role } = req.body;
    const { uid } = req.headers;
    if (email && password) {
        const hashPassword = (0, Encryption_1.encryptPassword)(password);
        DBSchema_1.Manager.findOne({ _id: uid }, {}, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.status(400).json({ status: 'failed', message: 'Error' });
            }
            else {
                if (results) {
                    const { employees } = results;
                    try {
                        const newUser = new DBSchema_1.User({
                            role,
                            email,
                            fullname,
                            managerId: uid,
                            password: hashPassword,
                            manager: results.fullname,
                        });
                        const createdUser = yield newUser.save();
                        yield DBSchema_1.Manager.updateOne({ _id: uid }, { employees: [...employees, createdUser] });
                        res.status(200).json({ status: 'success' });
                    }
                    catch (error) {
                        res
                            .status(400)
                            .json({ status: 'failed', message: 'email already exists' });
                    }
                }
            }
        }));
    }
});
exports.createUser = createUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const currentUser = yield DBSchema_1.User.findOne({ email });
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
            res.status(401).send({ status: 'failed', message: error.message });
        }
    }
});
exports.getUser = getUser;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.headers;
    try {
        const currentUser = yield DBSchema_1.User.findOne({ _id: uid }).select({
            role: true,
            manager: true,
            fullname: true,
            managerId: true,
            developmentgoals: true,
            performancegoals: true,
        });
        if (currentUser) {
            const userData = {
                role: currentUser.role,
                manager: currentUser.manager,
                fullname: currentUser.fullname,
                managerId: currentUser.managerId,
                developmentgoals: currentUser.developmentgoals,
                performancegoals: currentUser.performancegoals,
            };
            res.status(200).json({ status: 'success', data: userData });
        }
    }
    catch (error) {
        if (error instanceof mongoose_1.MongooseError) {
            res.status(400).send({ status: 'failed', message: error.message });
        }
    }
});
exports.getProfile = getProfile;
