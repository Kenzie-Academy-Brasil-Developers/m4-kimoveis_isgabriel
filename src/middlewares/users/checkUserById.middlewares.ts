import { NextFunction, Request, Response } from "express";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Repository } from "typeorm";

const checkUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const userId: number = Number(req.params.id);
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const user: User | null = await userRepo.findOneBy({ id: userId });
    if (!user) {
        throw new AppError("User not found", 404);
    }

    return next();
};

export { checkUserById };
