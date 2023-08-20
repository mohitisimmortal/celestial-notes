"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authorize_1 = __importDefault(require("../middlewares/authorize"));
const router = express_1.default.Router();
router.route('/signup').post(userController_1.signup);
router.route('/login').post(userController_1.login);
router.route('/getallnotes').get(authorize_1.default, userController_1.getAllNotes);
router.route('/getsinglenote/:id').get(authorize_1.default, userController_1.getNoteById);
router.route('/createnote').post(authorize_1.default, userController_1.createNote);
router.route('/updatenote/:id').put(authorize_1.default, userController_1.updateNote);
router.route('/deletenote/:id').delete(authorize_1.default, userController_1.deleteNote);
exports.default = router;
