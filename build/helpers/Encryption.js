"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.encryptPassword = void 0;
const bcryptjs_1 = require("bcryptjs");
const encryptPassword = (password) => {
    const saltRounds = 8;
    const genSalt = (0, bcryptjs_1.genSaltSync)(saltRounds);
    const encryptedPassword = (0, bcryptjs_1.hashSync)(password, genSalt);
    return encryptedPassword;
};
exports.encryptPassword = encryptPassword;
const comparePassword = (password, hashedPassword) => {
    const compare = (0, bcryptjs_1.compareSync)(password, hashedPassword);
    return compare;
};
exports.comparePassword = comparePassword;
