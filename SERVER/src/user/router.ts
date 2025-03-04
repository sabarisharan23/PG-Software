import express from "express";
import { createUserController, deleteUserController, getUsersController, updateUserController,getUserByIdController } from "./controller";

const userRouter = express.Router();

userRouter.post("/createUser", createUserController);
userRouter.get("/getUser", getUsersController);
userRouter.get("/getUser/:id", getUserByIdController);
userRouter.put("/updateUser/:id", updateUserController);
userRouter.delete("/deleteUser/:id", deleteUserController);

export default userRouter;
