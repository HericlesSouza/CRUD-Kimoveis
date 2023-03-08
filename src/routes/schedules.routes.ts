import { Router } from "express";
import { createScheduleController } from "../controllers/schedule.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { createScheduleSchema } from "../schemas/schedules.schema";

export const scheduleRoutes: Router = Router();

scheduleRoutes.post("", ensureTokenIsValid, ensureDataIsValidMiddleware(createScheduleSchema), createScheduleController);