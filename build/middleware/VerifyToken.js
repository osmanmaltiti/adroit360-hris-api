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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateManager = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const bearerToken = authorization.split(' ');
        const [_, token] = bearerToken;
        jsonwebtoken_1.default.verify(token, String(process.env.ACCESSTOKENLOCK), {}, (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.status(401).json({ status: 'Failed', message: 'Unauthorized' });
            }
            else {
                if (decode) {
                    const { role } = decode;
                    if (role === 'Employee') {
                        next();
                    }
                }
                else {
                    res.status(401).json({ status: 'Failed', message: 'Unauthorized' });
                }
            }
        }));
    }
    else {
        res.status(401).json({ status: 'Failed', message: 'Unauthorized' });
    }
};
exports.authenticate = authenticate;
const authenticateManager = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const bearerToken = authorization.split(' ');
        const [_, token] = bearerToken;
        jsonwebtoken_1.default.verify(token, String(process.env.ACCESSTOKENLOCK), {}, (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.status(401).json({ status: 'Failed', message: 'Unauthorized' });
            }
            else {
                if (decode) {
                    const { role } = decode;
                    if (role === 'manager') {
                        next();
                    }
                }
                else {
                    res.status(401).json({ status: 'Failed', message: 'Unauthorized' });
                }
            }
        }));
    }
    else {
        res.status(401).json({ status: 'Failed', message: 'Unauthorized' });
    }
};
exports.authenticateManager = authenticateManager;
