import { Repository } from "typeorm";
import {
    TCreateUser,
    TReturnCreateUser,
} from "../../interfaces/user.interfaces";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { hashSync } from "bcryptjs";
import { returnUserSchema } from "../../schemas/user.schemas";

const createUserService = async (
    userData: TCreateUser
): Promise<TReturnCreateUser> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const hashPassword: string = hashSync(userData.password);
    const user: User = userRepo.create({ ...userData, password: hashPassword });

    await userRepo.save(user);

    const newUser = returnUserSchema.parse(user);
    return newUser;
};

export { createUserService };
