import { z } from "zod";

export const userSchema = z.object({
    id: z.number(),
    name: z.string().max(45),
    email: z.string().email().max(45),
    admin: z.boolean().optional().default(false),
    password: z.string().max(120),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable()
});

export const createUserSchema = userSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true
}).extend({
    password: z.string().max(40)
});

export const updateUserSchema = createUserSchema.omit({
    admin: true
}).partial();

export const returnUserSchema = userSchema.omit({
    password: true
});

export const returnAllUserSchema = returnUserSchema.array();

