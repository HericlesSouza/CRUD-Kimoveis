import { z } from "zod";

export const categorySchema = z.object({
    id: z.number(),
    name: z.string().max(45)
});

export const createCategorySchema = categorySchema.omit({
    id: true
});

export const returnCategoryRealStateSchema = categorySchema.extend({
    realEstate: z.object({
        id: z.number(),
        sold: z.boolean().default(false),
        value: z.string().regex(/^\d{1,10}(\.\d{1,2})?$/).or(z.number()),
        size: z.number().positive(),
        createdAt: z.string().or(z.date()),
        updatedAt: z.string().or(z.date()),
    }).array()
});

export const returnAllCategoriesSchema = categorySchema.array();