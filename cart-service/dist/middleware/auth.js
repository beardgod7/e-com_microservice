"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Errorhandler_1 = __importDefault(require("../utils/Errorhandler"));
class Auth {
    constructor() {
        this.isAuthenticated = async (req, res, next) => {
            var _a;
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (!token) {
                return next(new Errorhandler_1.default('No token provided', 403));
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                req.user = decoded;
                next();
            }
            catch (err) {
                return next(new Errorhandler_1.default('Invalid token', 401));
            }
        };
    }
}
exports.default = Auth;
