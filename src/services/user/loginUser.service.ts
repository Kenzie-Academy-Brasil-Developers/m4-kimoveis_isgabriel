import { Repository } from "typeorm";
import { TLogin } from "../../interfaces/user.interfaces";
import jwt from "jsonwebtoken";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";

const loginUserService = async (loginData: TLogin): Promise<string> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const user: User | null = await userRepo.findOneBy({
        email: loginData.email,
    });
    if (!user) {
        throw new AppError("Invalid credentials", 401);
    }

    const comparePass: boolean = await compare(
        loginData.password,
        user.password
    );
    if (!comparePass) {
        throw new AppError("Invalid credentials", 401);
    }

    const token: string = jwt.sign(
        {
            admin: user.admin,
        },
        String(process.env.SECRET_KEY!),
        {
            expiresIn: "24h",
            subject: String(user.id),
        }
    );
    return token;
};

export { loginUserService };
