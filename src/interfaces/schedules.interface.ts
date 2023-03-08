import { z } from "zod";
import { createScheduleSchema, returnScheduleRelations, scheduleSchema } from "../schemas/schedules.schema";

export type TCreateSchedule = z.infer<typeof createScheduleSchema>

export type TReturnSchedule = z.infer<typeof scheduleSchema>

export type TReturnScheduleRealEstateRelations = z.infer<typeof returnScheduleRelations>