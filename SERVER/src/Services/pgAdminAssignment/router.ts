import { Router } from "express";
import { createPgAdminAssignmentController, deletePgAdminAssignmentController, getPgAdminAssignmentController, updatePgAdminAssignmentController } from "./controller";

const adminAssignmentRouter = Router();

adminAssignmentRouter.post("/AdminAssignment", createPgAdminAssignmentController);
adminAssignmentRouter.get("/getAdminAssignment/:userId/:roomId", getPgAdminAssignmentController);
adminAssignmentRouter.put("/updateAdminAssignment/:userId/:roomId", updatePgAdminAssignmentController);
adminAssignmentRouter.delete("/deleteAdminAssignment/:userId/:roomId", deletePgAdminAssignmentController);

export default adminAssignmentRouter;