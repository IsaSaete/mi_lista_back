import { Model } from "mongoose";
import jwt from "jsonwebtoken";
import { NextFunction } from "express";
import {
  AuthControllerStructure,
  RegisterResponse,
  RegisterRequest,
  LoginRequest,
  LoginResponse,
} from "./types.js";
import { IUserStructure } from "../userTypes.js";
import ServerError from "../../server/serverError/serverError.js";

class AuthController implements AuthControllerStructure {
  constructor(private readonly authUserModel: Model<IUserStructure>) {}

  public registerUser = async (
    req: RegisterRequest,
    res: RegisterResponse,
    next: NextFunction,
  ): Promise<void> => {
    const { email, name, password } = req.body;

    const existingUser = await this.authUserModel.findOne({ email });

    if (existingUser) {
      const error = new ServerError(409, "El usuario ya existe");

      next(error);

      return;
    }

    const userData = { email, name, password };

    const newUser = await this.authUserModel.create(userData);

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!, {
      expiresIn: "30d",
    });

    const userRegistered = {
      token,
      user: { id: newUser._id, email: newUser.email, name: newUser.name },
    };

    res.status(201).json(userRegistered);
  };

  public loginUser = async (
    req: LoginRequest,
    res: LoginResponse,
    next: NextFunction,
  ): Promise<void> => {
    const { email, password } = req.body;

    const user = await this.authUserModel.findOne({ email });

    if (!user) {
      const error = new ServerError(401, "Credenciales inválidas");
      next(error);

      return;
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      const error = new ServerError(401, "Credenciales inválidas");
      next(error);

      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "30d",
    });

    const userRegistered = {
      token,
      user: { id: user._id, email: user.email, name: user.name },
    };

    res.status(200).json(userRegistered);
  };
}

export default AuthController;
