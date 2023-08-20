"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config({ path: '.env' });
// start database
const database_1 = __importDefault(require("./database"));
(0, database_1.default)();
const corsOptions = {
    origin: '*'
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
app.use('/user', userRoute_1.default);
app.get('/', (req, res) => {
    res.send('im fine');
});
const server = app.listen(3000, () => {
    console.log(`server is running on http://localhost:3000`);
});
module.exports = app;
