import { Request, Response } from "express";
import { TCreateUser, TUpdateUser } from "../interfaces/users.interface";
import { createUserService } from "../services/users/createUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { listAllUsersServices } from "../services/users/listAllUsers.service";
import { updateUserService } from "../services/users/updateUser.service";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const data: TCreateUser = req.body;

    const newUser = await createUserService(data);

    return res.status(201).json(newUser);
};

export const listAllUsersController = async (req: Request, res: Response): Promise<Response> => {
    const users = await listAllUsersServices();

    return res.status(200).json(users);
};

export const updateUserController = async (req: Request, res: Response): Promise<Response> => {
    const dataUser: TUpdateUser = req.body;
    const idUser = Number(req.params.id);
    const loggedUser = req.user;

    const newUser = await updateUserService(dataUser, idUser, loggedUser);

    return res.status(200).json(newUser);
};

export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
    const idUser = Number(req.params.id);

    await deleteUserService(idUser);

    return res.status(204).send();
};