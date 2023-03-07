import { DeepPartial } from "typeorm";
import { z } from "zod";
import { createUserSchema, returnAllUserSchema, returnUserSchema } from "../schemas/users.schema";

export type TCreateUser = z.infer<typeof createUserSchema>

export type TReturnUser = z.infer<typeof returnUserSchema>

export type TReturnAllUser = z.infer<typeof returnAllUserSchema>

export type TUpdateUser = DeepPartial<typeof createUserSchema>

export interface iLoggedUser {
    id: number,
    admin: boolean
}