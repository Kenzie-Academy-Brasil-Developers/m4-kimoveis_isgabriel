import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

const ensureEmailExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const email: string = req.body.email;

    if (email) {
        const checkEmail: User | null = await userRepo.findOne({
            where: {
                email: email,
            },
            withDeleted: true,
        });
        if (checkEmail) {
            throw new AppError("Email already exists", 409);
        }
    }
    return next();
};

export { ensureEmailExists };
