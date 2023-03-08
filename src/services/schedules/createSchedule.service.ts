import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors";
import { TCreateSchedule, TReturnSchedule } from "../../interfaces/schedules.interface";

export const createScheduleService = async (scheduleData: TCreateSchedule, userId: number): Promise<TReturnSchedule> => {
    const scheduleRepository = AppDataSource.getRepository(Schedule);
    const userRepository = AppDataSource.getRepository(User);
    const realEstateRepository = AppDataSource.getRepository(RealEstate);

    const scheduleQueryBuilder = scheduleRepository.createQueryBuilder("schedule");

    const user = await userRepository.findOneBy({
        id: userId
    });

    const realEstate = await realEstateRepository.findOneBy({
        id: scheduleData.realEstateId
    });

    if (!realEstate) {
        throw new AppError("RealEstate not found", 404);
    }

    const ensureDateAndHourRealEstateExists = await scheduleQueryBuilder.
        select("schedule").
        where("schedule.date = :date", { date: scheduleData.date }).
        andWhere("schedule.hour = :hour", { hour: scheduleData.hour }).
        andWhere("schedule.realEstate = :realEstate", { realEstate: scheduleData.realEstateId }).
        getOne();

    if (ensureDateAndHourRealEstateExists) {
        throw new AppError("Schedule to this real estate at this date and time already exists", 409);
    }

    const ensureDateAndHourDifferentRealEstateExists = await scheduleQueryBuilder.
        select("schedule").
        where("schedule.date = :date", { date: scheduleData.date }).
        andWhere("schedule.hour = :hour", { hour: scheduleData.hour }).
        andWhere("schedule.user = :user", { user: userId }).
        getOne();

    if (ensureDateAndHourDifferentRealEstateExists) {
        throw new AppError("User schedule to this real estate at this date and time already exists", 409);
    }

    const data = new Date(scheduleData.date);
    const day = data.getDay();

    if (day === 0 || day === 6) {
        throw new AppError("Invalid date, work days are monday to friday", 400);
    }

    const hour = Number(scheduleData.hour.split(":")[0]);

    if (hour <= 7 || hour >= 18) {
        throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
    }

    let addIdToScheduleData = {};

    if (user) {
        addIdToScheduleData = {
            ...scheduleData,
            user: user,
            realEstate: realEstate
        };
    }

    const createSchedule = scheduleRepository.create(addIdToScheduleData);

    await scheduleRepository.save(createSchedule);

    return createSchedule;
};