import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { TReturnAllRealEstates } from "../../interfaces/realEstate.interfaces";

const getAllRealEstatesService = async (): Promise<TReturnAllRealEstates> => {
    const realEstateRepo: Repository<RealEstate> =
        AppDataSource.getRepository(RealEstate);
    const findAllRealEstates: Array<RealEstate> = await realEstateRepo.find({
        relations: {
            address: true,
        },
    });

    return findAllRealEstates;
};

export { getAllRealEstatesService };
