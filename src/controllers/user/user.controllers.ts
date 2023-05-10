import { Request, Response } from "express";
import {
    TCreateUser,
    TLogin,
    TReturnCreateUser,
} from "../../interfaces/user.interfaces";
import { createUserService } from "../../services/user/createUser.service";
import { loginUserService } from "../../services/user/loginUser.service";

const createUserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userData: TCreateUser = req.body;
    const newUser: TReturnCreateUser = await createUserService(userData);

    return res.status(201).json(newUser);
};

const loginUserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const loginData: TLogin = req.body;
    const token: string = await loginUserService(loginData);

    return res.status(200).json({ token: token });
};

export { createUserController, loginUserController };
