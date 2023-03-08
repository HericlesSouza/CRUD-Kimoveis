import { DeepPartial } from "typeorm";
import { z } from "zod";

import { createRealEstateSchema, realEstateSchema, returnAllRealEstatesSchema } from "../schemas/realEstate.schema";

export type TRealEstate = z.infer<typeof realEstateSchema>

export type TCreateRealEstate = z.infer<typeof createRealEstateSchema>

export type TReturnAllRealEstates = DeepPartial<typeof returnAllRealEstatesSchema>



