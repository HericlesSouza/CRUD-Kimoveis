import { Router } from "express";
import { createCategoryController, listAllCategoriesController } from "../controllers/categories.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureTokenIsAdmin } from "../middlewares/ensureTokenIsAdmin.middleware";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { createCategorySchema } from "../schemas/categories.schema";

export const categoryRoutes: Router = Router();

categoryRoutes.post("", ensureDataIsValidMiddleware(createCategorySchema), ensureTokenIsValid, ensureTokenIsAdmin, createCategoryController);
categoryRoutes.get("", listAllCategoriesController);

