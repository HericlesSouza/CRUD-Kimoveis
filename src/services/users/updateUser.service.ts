import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { iLoggedUser, TReturnUser, TUpdateUser } from "../../interfaces/users.interface";
import { returnUserSchema } from "../../schemas/users.schema";

export const updateUserService = async (dataUser: TUpdateUser, idUser: number, loggedUser: iLoggedUser): Promise<TReturnUser> => {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({
        id: idUser
    });

    if (user?.id !== loggedUser.id && !loggedUser.admin) {
        throw new AppError("Insufficient permission", 403);
    }

    const newUser = userRepository.create({
        ...user,
        ...dataUser
    });

    await userRepository.save(newUser);

    return returnUserSchema.parse(newUser);
};