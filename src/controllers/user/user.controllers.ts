import { Request, Response } from "express";
import {
    TCreateUser,
    TReturnCreateUser,
} from "../../interfaces/user.interfaces";
import { createUserService } from "../../services/user/createUser.service";

const createUserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userData: TCreateUser = req.body;
    const newUser: TReturnCreateUser = await createUserService(userData);

    return res.status(201).json(newUser);
};

export { createUserController };
