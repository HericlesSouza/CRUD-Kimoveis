import { Request, Response } from "express";
import { createScheduleService } from "../services/schedules/createSchedule.service";

export const createScheduleController = async (req: Request, res: Response): Promise<Response> => {
    const scheduleData = req.body;
    const idUser = req.user.id;
    
    const newSchedule = await createScheduleService(scheduleData, idUser);

    return res.status(201).json({
        message: "Schedule created"
    });
};