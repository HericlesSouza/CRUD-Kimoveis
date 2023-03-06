import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { TCreateUser, TReturnUser } from "../../interfaces/users.interface";
import { returnUserSchema } from "../../schemas/users.schema";

export const createUserService = async (userData: TCreateUser): Promise<TReturnUser> => {
    const userRepository = AppDataSource.getRepository(User);

    const newUser = userRepository.create(userData);

    await userRepository.save(newUser);

    const userReturn = returnUserSchema.parse(newUser);

    return userReturn;
};