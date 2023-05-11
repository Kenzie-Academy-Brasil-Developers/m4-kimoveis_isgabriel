import * as express from "express";
import { TUser } from "../../interfaces/user.interfaces";

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
