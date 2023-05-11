import { Repository } from "typeorm";
import {
    TReturnCreateUser,
    TUpdateUser,
} from "../../interfaces/user.interfaces";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { returnUserSchema } from "../../schemas/user.schemas";

const patchUserService = async (
    userData: TUpdateUser,
    userId: number
): Promise<TReturnCreateUser> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({
        id: userId,
    });

    const updatedUser = userRepo.create({
        ...user,
        ...userData,
    });

    await userRepo.save(updatedUser);

    return returnUserSchema.parse(updatedUser);
};

export { patchUserService };
