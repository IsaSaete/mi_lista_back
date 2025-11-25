import { Router } from "express";
import AuthController from "../controller/AuthController.js";
import AuthUser from "../model/User.js";

const authRouter = Router();

const authController = new AuthController(AuthUser);

authRouter.post("/register", authController.registerUser);

authRouter.post("/login", authController.loginUser);

export default authRouter;
