import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { TCreateUser } from "../interfaces/users.interface";

export const ensureUserExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const idUser = Number(req.params.id);
    const user: TCreateUser = req.body;

    const userRepository = AppDataSource.getRepository(User);

    if (idUser) {
        const checkUserExist = await userRepository.findOne({
            where: {
                id: idUser
            },
            withDeleted: true
        });

        if (!checkUserExist) {
            throw new AppError("User not found", 404);
        }
    }

    if (user.email) {
        const checkUserExist = await userRepository.findOne({
            where: {
                email: user.email,
            },
            withDeleted: true
        });

        if (checkUserExist) {
            throw new AppError("Email already exists", 409);
        }
    }

    return next();
};