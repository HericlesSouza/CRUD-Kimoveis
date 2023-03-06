import { z } from "zod";

export const categorySchema = z.object({
    id: z.number(),
    name: z.string().max(45)
});

export const createCategorySchema = categorySchema.omit({
    id: true
});

export const returnAllCategoriesSchema = categorySchema.array();