import { Request, Response } from "express";
import { createScheduleService } from "../services/schedules/createSchedule.service";
import { listScheduleRealEstateService } from "../services/schedules/listScheduleRealEstate.service";

export const createScheduleController = async (req: Request, res: Response): Promise<Response> => {
    const scheduleData = req.body;
    const idUser = req.user.id;

     await createScheduleService(scheduleData, idUser);

    return res.status(201).json({
        message: "Schedule created"
    });
};

export const listScheduleRealEstateController = async (req: Request, res: Response): Promise<Response> => {
    const userId = Number(req.params.id);

    const scheduleRealEstate = await listScheduleRealEstateService(userId);

    return res.status(200).json(scheduleRealEstate);
};