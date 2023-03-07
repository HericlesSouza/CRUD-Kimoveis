import { z } from "zod";
import { categorySchema } from "./categories.schema";

export const addressSchema = z.object({
    id: z.number(),
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().max(7).nullish(),
    city: z.string().max(20),
    state: z.string().max(2)
});

export const realEstateSchema = z.object({
    id: z.number(),
    sold: z.boolean().default(false),
    value: z.string().regex(/^\d{1,10}(\.\d{1,2})?$/).or(z.number()),
    size: z.number().positive(),
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
    address: z.lazy(() => addressSchema),
    category: z.lazy(() => categorySchema).nullish()
});

export const returnAllRealEstatesSchema = realEstateSchema.array();

export const realEstateSchemaPartial = realEstateSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    address: true,
    category: true
});

export const addressSchemaWithoutId = addressSchema.omit({
    id: true
});

export const createRealEstateInputSchema = z.object({
    address: z.lazy(() => addressSchemaWithoutId),
    categoryId: z.number().nullish()
});

export const createRealEstateSchema = realEstateSchemaPartial.merge(createRealEstateInputSchema);
