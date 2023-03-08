import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule } from "../../entities";
import { AppError } from "../../errors";
import { TReturnScheduleRealEstateRelations } from "../../interfaces/schedules.interface";
import { returnScheduleRelations } from "../../schemas/schedules.schema";

export const listScheduleRealEstateService = async (id: number): Promise<TReturnScheduleRealEstateRelations> => {
    const scheduleRepository = AppDataSource.getRepository(Schedule);
    const realEstateRepository = AppDataSource.getRepository(RealEstate);

    const realEstate = await realEstateRepository.findOne({
        relations: {
            address: true,
            category: true
        },
        where: {
            id: id
        }
    });

    if (!realEstate) {
        throw new AppError("RealEstate not found", 404);
    }

    const schedule = await scheduleRepository.find({
        relations: {
            user: true
        },
        where: {
            realEstate: {
                id: id
            }
        }
    });

    const returnSchedule = {
        ...realEstate,
        schedules: schedule
    };
 
    return returnScheduleRelations.parse(returnSchedule);
};
