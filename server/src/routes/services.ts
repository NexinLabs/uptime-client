import { Router } from "express";
import serviceController from "@/controllers/services";
const serviceRouter = Router();

serviceRouter.get("/", serviceController.getServices);
serviceRouter.get("/logs", serviceController.getAllServiceLogs);
serviceRouter.get("/overview/stats", serviceController.getOverview);
serviceRouter.get("/logs/recent", serviceController.getRecentLogs);

serviceRouter.get("/:serviceId", serviceController.getService);
serviceRouter.get("/:serviceId/logs", serviceController.getServiceLogs);
serviceRouter.put("/:serviceId", serviceController.updateService);
serviceRouter.delete("/:serviceId", serviceController.deleteService);

serviceRouter.post("/", serviceController.createService);
serviceRouter.post("/:serviceId/restarter", serviceController.createServiceRestarter);

export default serviceRouter;


