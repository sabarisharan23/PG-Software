import { Router } from "express";
import { createPgAdminAssignmentController, deletePgAdminAssignmentController, getAllPgAdminsController, getPgAdminAssignmentController, updatePgAdminAssignmentController } from "./controller";
import { getAllPgAdmins } from "./service";

const adminAssignmentRouter = Router();

adminAssignmentRouter.post("/createAdminAssignment", createPgAdminAssignmentController);
adminAssignmentRouter.get("/getAllPgAdmin", getAllPgAdminsController);
adminAssignmentRouter.get("/getAdminAssignment/:adminId/:pgId", getPgAdminAssignmentController);
adminAssignmentRouter.put("/updateAdminAssignment/:adminId/:pgId", updatePgAdminAssignmentController);
adminAssignmentRouter.delete("/deleteAdminAssignment", deletePgAdminAssignmentController);

export default adminAssignmentRouter;