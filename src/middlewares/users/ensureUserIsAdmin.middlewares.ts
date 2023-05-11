import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors";

const ensureUserIsAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const authtenticatedAdmin = req.user.admin;
    const userId = req.user.id;
    const paramsUserId = Number(req.params.id);
    if (authtenticatedAdmin === true) {
        return next();
    } else if (req.method === "PATCH" && userId === paramsUserId) {
        return next();
    } else {
        throw new AppError("Insufficient permission", 403);
    }
};

export { ensureUserIsAdmin };
