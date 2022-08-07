"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const GoalRoute_1 = __importDefault(require("./routes/GoalRoute"));
const ManagerRoute_1 = __importDefault(require("./routes/ManagerRoute"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
dotenv_1.default.config({
    path: './.env',
});
const port = Number(process.env.PORT) || 8080;
const app = (0, express_1.default)();
mongoose_1.default.connect(String(process.env.MONGOCLIENT_PRODUCTION) ||
    String(process.env.MONGOCLIENT_LOCAL));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/v1/user', UserRoute_1.default);
app.use('/api/v1/goal', GoalRoute_1.default);
app.use('/api/v1/manager', ManagerRoute_1.default);
app.listen(port, () => console.log(`Server is listening on port ${port}`));
