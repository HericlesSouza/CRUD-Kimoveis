import { realEstateSchema } from "./realEstate.schema";
import { z } from "zod";
import { userSchema } from "./users.schema";

export const returnRealEstateScheduleSchema = realEstateSchema.omit({
    address: true, category: true
});

export const scheduleSchema = z.object({
    id: z.number(),
    date: z.string(),
    hour: z.string(),
    realEstate: z.lazy(() => returnRealEstateScheduleSchema),
    user: z.lazy(() => userSchema)
});

export const createScheduleSchema = scheduleSchema.omit({ id: true, user: true, realEstate: true }).extend({
    realEstateId: z.number(),
});

export const schedulePartialSchema = scheduleSchema.omit({
    realEstate: true
}).array();

export const returnScheduleRelations = realEstateSchema.extend({
    schedules: z.lazy(() => schedulePartialSchema)
}).partial();