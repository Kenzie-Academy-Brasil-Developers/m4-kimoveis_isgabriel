import * as express from "express";
import { IUser } from "../../interfaces/user.interfaces";

declare global {
    namespace Express {
        interface Request {
            user: {
                id: number;
                admin: boolean;
            };
        }
    }
}
