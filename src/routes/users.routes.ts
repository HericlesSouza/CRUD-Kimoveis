import { Router } from "express";
import { createUserController, deleteUserController, listAllUsersController, updateUserController } from "../controllers/users.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureTokenIsAdmin } from "../middlewares/ensureTokenIsAdmin.middleware";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";
import { createUserSchema, updateUserSchema } from "../schemas/users.schema";

const userRoutes: Router = Router();

userRoutes.post("", ensureDataIsValidMiddleware(createUserSchema), ensureUserExistsMiddleware, createUserController);
userRoutes.get("", ensureTokenIsValid, ensureTokenIsAdmin, listAllUsersController);
userRoutes.patch("/:id", ensureTokenIsValid, ensureUserExistsMiddleware, ensureDataIsValidMiddleware(updateUserSchema), updateUserController);
userRoutes.delete("/:id", ensureUserExistsMiddleware, ensureTokenIsValid, ensureTokenIsAdmin, deleteUserController);

export default userRoutes;

