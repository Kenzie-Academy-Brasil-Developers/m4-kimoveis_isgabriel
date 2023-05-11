import { Repository } from "typeorm";
import { RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

const getAllSchedulesService = async (
    realEstateID: number
): Promise<RealEstate> => {
    const realEstateRepo: Repository<RealEstate> =
        AppDataSource.getRepository(RealEstate);

    const findRealEstate: RealEstate | null = await realEstateRepo
        .createQueryBuilder("realEstate")
        .innerJoinAndSelect("realEstate.address", "address")
        .leftJoinAndSelect("realEstate.schedules", "schedule")
        .leftJoinAndSelect("schedule.user", "user.id")
        .leftJoinAndSelect("realEstate.category", "category")
        .where("realEstate.id = :id", { id: realEstateID })
        .getOne();
    if (!findRealEstate) {
        throw new AppError("RealEstate not found", 404);
    }

    return findRealEstate;
};

export { getAllSchedulesService };
