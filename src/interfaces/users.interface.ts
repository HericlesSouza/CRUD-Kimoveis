import { DeepPartial } from "typeorm";
import { boolean, z } from "zod";
import { createUserSchema, returnAllUserSchema, returnUserSchema, updateUserSchema } from "../schemas/users.schema";

export type TCreateUser = z.infer<typeof createUserSchema>

export type TReturnUser = z.infer<typeof returnUserSchema>

export type TReturnAllUser = z.infer<typeof returnAllUserSchema>

export type TUpdateUser = DeepPartial<TCreateUser>

export interface iLoggedUser {
    id: number,
    admin: boolean
}