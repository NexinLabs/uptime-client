import { Router } from "express";
import serviceController from "@/controllers/services";
const serviceRouter = Router();

serviceRouter.get("/", serviceController.getServices);
serviceRouter.post("/", serviceController.createService);
serviceRouter.get("/overview/stats", serviceController.getOverview);
serviceRouter.get("/logs/recent", serviceController.getRecentLogs);
serviceRouter.get("/:id", serviceController.getService);
serviceRouter.put("/:id", serviceController.updateService);
serviceRouter.delete("/:id", serviceController.deleteService);

export default serviceRouter;


