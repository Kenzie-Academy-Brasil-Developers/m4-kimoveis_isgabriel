import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors";
import jwt from "jsonwebtoken";

const ensureTokenIsValid = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    let token: string | undefined = req.headers.authorization;
    if (!token) {
        throw new AppError("Missing bearer token", 401);
    }

    const auth: string = token.split(" ")[1];

    jwt.verify(auth, process.env.SECRET_KEY!, (error, decoded: any) => {
        if (error) {
            console.log(error);
            throw new AppError(error.message, 401);
        }
        req.user = {
            id: parseInt(decoded?.sub),
            admin: decoded.admin,
        };
        return next();
    });
};

export { ensureTokenIsValid };
