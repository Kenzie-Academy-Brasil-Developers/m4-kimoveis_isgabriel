import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors";

const ensureUserIsAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const authenticatedAdmin: boolean = req.user.admin;
    const userId: number = req.user.id;
    const paramsUserId: number = Number(req.params.id);

    if (authenticatedAdmin === true) {
        return next();
    } else if (req.method === "PATCH" && userId === paramsUserId) {
        return next();
    } else {
        throw new AppError("Insufficient permission", 403);
    }
};

export { ensureUserIsAdmin };
