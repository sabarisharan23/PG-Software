import express from "express";
import { createPGController, getPGsController, updatePGController, deletePGController, getPGByIdController } from "./controller";


const pgRouter = express.Router();

pgRouter.post("/createPG", createPGController);
pgRouter.get("/getPG", getPGsController);
pgRouter.get("/getPG/:id", getPGByIdController);
pgRouter.put("/updatePG/:id", updatePGController);
pgRouter.delete("/deletePG/:id", deletePGController);

export default pgRouter;
