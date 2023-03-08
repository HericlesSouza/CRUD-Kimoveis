import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const ensureTokenIsAdmin = (req: Request, res: Response, next: NextFunction): Response | void => {
    const typeUser = req.user.admin;

    if (!typeUser) {
        throw new AppError("Insufficient permission", 403);
    }

    next();
};