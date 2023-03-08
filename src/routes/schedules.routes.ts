import { Router } from "express";
import { createScheduleController, listScheduleRealEstateController } from "../controllers/schedule.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureTokenIsAdmin } from "../middlewares/ensureTokenIsAdmin.middleware";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { createScheduleSchema } from "../schemas/schedules.schema";

export const scheduleRoutes: Router = Router();

scheduleRoutes.post("", ensureTokenIsValid, ensureDataIsValidMiddleware(createScheduleSchema), createScheduleController);
scheduleRoutes.get("/realEstate/:id", ensureTokenIsValid, ensureTokenIsAdmin, listScheduleRealEstateController);