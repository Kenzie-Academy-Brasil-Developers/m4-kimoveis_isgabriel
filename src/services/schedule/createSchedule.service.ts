import { Repository } from "typeorm";
import { TCreateSchedule } from "../../interfaces/schedule.interfaces";
import { RealEstate, Schedule, User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

const createScheduleService = async (
    scheduleData: TCreateSchedule,
    userId: number
): Promise<void> => {
    const scheduleRepo: Repository<Schedule> =
        AppDataSource.getRepository(Schedule);

    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const realEstateRepo: Repository<RealEstate> =
        AppDataSource.getRepository(RealEstate);

    const scheduleExists: Schedule | null = await scheduleRepo
        .createQueryBuilder("schedule")
        .where("schedule.realEstateId = :realEstateId", {
            realEstateId: scheduleData.realEstateId,
        })
        .andWhere("schedule.date = :date", { date: scheduleData.date })
        .andWhere("schedule.hour = :hour", { hour: scheduleData.hour })
        .getOne();
    if (scheduleExists) {
        throw new AppError(
            "Schedule to this real estate at this date and time already exists",
            409
        );
    }

    if (scheduleData.hour > "18:00" || scheduleData.hour < "08:00") {
        throw new AppError("Invalid hour, available times are 8AM to 18PM");
    }

    const newVisitDate: Date = new Date(scheduleData.date);
    const dayOfWeek: number = newVisitDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        throw new AppError("Invalid date, work days are monday to friday", 400);
    }

    const user: User | null = await userRepo.findOneBy({
        id: userId,
    });

    const realEstate: RealEstate | null = await realEstateRepo.findOneBy({
        id: scheduleData.realEstateId,
    });
    if (!realEstate) {
        throw new AppError("RealEstate not found", 404);
    }

    const userHasScheduled: Schedule | null = await scheduleRepo.findOneBy({
        date: scheduleData.date,
        hour: scheduleData.hour,
    });
    if (userHasScheduled) {
        throw new AppError(
            "User schedule to this real estate at this date and time already exists",
            409
        );
    }

    const schedule: Schedule = scheduleRepo.create({
        ...scheduleData,
        realEstate: realEstate,
        user: user!,
    });
    await scheduleRepo.save(schedule);
};

export { createScheduleService };
