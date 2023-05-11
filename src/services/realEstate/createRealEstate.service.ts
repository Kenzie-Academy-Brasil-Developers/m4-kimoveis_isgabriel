import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";
import {
    TCreateRealEstate,
    TReturnCreateRealEstate,
} from "../../interfaces/realEstate.interfaces";
import { createAddressSchema } from "../../schemas/addresses.schemas";
import { returnRealEstateSchema } from "../../schemas/realEstate.schemas";

const createRealEstateService = async (
    realEstateData: TCreateRealEstate
): Promise<TReturnCreateRealEstate> => {
    const realEstateRepo: Repository<RealEstate> =
        AppDataSource.getRepository(RealEstate);
    const addressRepo: Repository<Address> =
        AppDataSource.getRepository(Address);
    const categoryRepo: Repository<Category> =
        AppDataSource.getRepository(Category);

    if (realEstateData.address.number) {
        const addressExists: Address | null = await addressRepo.findOne({
            where: {
                street: realEstateData.address.street,
                number: realEstateData.address.number,
                city: realEstateData.address.city,
            },
        });
        if (addressExists) {
            throw new AppError("Address already exists", 409);
        }
    }

    const newAddress = createAddressSchema.parse(realEstateData.address);
    const address: Address = addressRepo.create(newAddress);
    await addressRepo.save(address);

    const category: Category | null = await categoryRepo.findOneBy({
        id: realEstateData.categoryId,
    });
    if (!category) {
        throw new AppError("Category not found", 404);
    }
    const newRealEstate: RealEstate = realEstateRepo.create({
        ...realEstateData,
        address: address,
        category: category,
    });

    await realEstateRepo.save(newRealEstate);

    const realEstate = returnRealEstateSchema.parse(newRealEstate);

    return realEstate;
};

export { createRealEstateService };
