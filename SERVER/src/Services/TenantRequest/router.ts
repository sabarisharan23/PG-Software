import { Router } from "express";
const requestRouter = Router();
import { createTenantRequestController, deleteTenantRequestController, getTenantRequestController, updateTenantRequestController } from "./controller";

requestRouter.post("/createRequest", createTenantRequestController);
requestRouter.get("/getRequest", getTenantRequestController);
requestRouter.put("/updateRequest/:id", updateTenantRequestController);
requestRouter.delete("/deleteRequest/:id", deleteTenantRequestController);        
        
export default requestRouter;