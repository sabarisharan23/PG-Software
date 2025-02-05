import express from "express";
import { createPGController, getPGsController, updatePGController, deletePGController } from "./controller";


const pgRouter = express.Router();

pgRouter.post("/createPG", createPGController);
pgRouter.get("/getPG", getPGsController);
pgRouter.put("/updatePG/:id", updatePGController);
pgRouter.delete("/deletePG/:id", deletePGController);

export default pgRouter;
