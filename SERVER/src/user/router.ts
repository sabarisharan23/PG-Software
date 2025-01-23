import express from "express";
import { createUserController } from "./controller";
const userRouter = express.Router();

userRouter.post("/createUser", createUserController);
