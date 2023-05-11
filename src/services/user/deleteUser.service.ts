import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";

const deleteUserService = async (userId: number): Promise<void> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
        where: {
            id: userId,
        },
    });

    await userRepo.softRemove(user!);
};

export { deleteUserService };
