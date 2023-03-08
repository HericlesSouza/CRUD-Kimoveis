import { DeepPartial } from "typeorm";
import { z } from "zod";
import { createScheduleSchema, scheduleSchema, teste } from "../schemas/schedules.schema";

export type TCreateSchedule = z.infer<typeof createScheduleSchema>

export type TReturnSchedule = z.infer<typeof scheduleSchema>