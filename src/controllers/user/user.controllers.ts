import { Request, Response } from "express";
import {
    TCreateUser,
    TListUsers,
    TLogin,
    TReturnCreateUser,
} from "../../interfaces/user.interfaces";
import { createUserService } from "../../services/user/createUser.service";
import { loginUserService } from "../../services/user/loginUser.service";
import { getUsersService } from "../../services/user/getUsers.service";
import { patchUserService } from "../../services/user/patchUser.service";
import { deleteUserService } from "../../services/user/deleteUser.service";

const createUserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userData: TCreateUser = req.body;
    const newUser: TReturnCreateUser = await createUserService(userData);

    return res.status(201).json(newUser);
};

const getUsersController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const usersList: TListUsers = await getUsersService();

    return res.status(200).json(usersList);
};

const patchUserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userId: number = Number(req.params.id);
    const updateUser = await patchUserService(req.body, userId);

    return res.status(200).json(updateUser);
};

const deleteuserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userId: number = Number(req.params.id);

    await deleteUserService(userId);

    return res.status(204).send();
};
const loginUserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const loginData: TLogin = req.body;
    const token: string = await loginUserService(loginData);

    return res.status(200).json({ token: token });
};
export {
    createUserController,
    getUsersController,
    patchUserController,
    deleteuserController,
    loginUserController,
};
