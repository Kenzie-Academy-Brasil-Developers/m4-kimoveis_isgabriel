import { Repository } from "typeorm";
import { TListUsers } from "../../interfaces/user.interfaces";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { returnMultipleUsersSchema } from "../../schemas/user.schemas";

const getUsersService = async (): Promise<TListUsers> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const findUsers: Array<User> = await userRepo.find({
        withDeleted: true,
    });

    const users = returnMultipleUsersSchema.parse(findUsers);

    return users;
};

export { getUsersService };
