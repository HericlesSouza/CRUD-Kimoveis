import { Router } from "express";
import { createRealEstateController, listAllRealEstatesController } from "../controllers/realEstate.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureTokenIsAdmin } from "../middlewares/ensureTokenIsAdmin.middleware";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { createRealEstateSchema } from "../schemas/realEstate.schema";

export const realEstateRoutes: Router = Router();

realEstateRoutes.post("", ensureDataIsValidMiddleware(createRealEstateSchema), ensureTokenIsValid, ensureTokenIsAdmin, createRealEstateController);
realEstateRoutes.get("", listAllRealEstatesController);