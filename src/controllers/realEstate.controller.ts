import { Request, Response } from "express";
import { TCreateRealEstate } from "../interfaces/realEstate.interface";
import { createRealEstateService } from "../services/realEstates/createRealEstate.service";
import { listAllRealEstatesService } from "../services/realEstates/listAllRealEstates.service";

export const createRealEstateController = async (req: Request, res: Response): Promise<Response> => {
    const realEstateData: TCreateRealEstate = req.body;

    const newRealEstate = await createRealEstateService(realEstateData);

    return res.status(201).send(newRealEstate);
};

export const listAllRealEstatesController = async (req: Request, res: Response): Promise<Response> => {
    const allRealEstates = await listAllRealEstatesService();

    return res.status(200).json(allRealEstates);
};