import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const ensureBodyIsValid =
    (schema: ZodTypeAny) =>
    (req: Request, res: Response, next: NextFunction): Response | void => {
        const validateBody = schema.parse(req.body);
        req.body = validateBody;

        return next();
    };

export { ensureBodyIsValid };
