import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { TReturnAllUser } from "../../interfaces/users.interface";
import { returnAllUserSchema } from "../../schemas/users.schema";

export const listAllUsersServices = async (): Promise<TReturnAllUser> => {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    const formattedUsers = returnAllUserSchema.parse(users);

    return formattedUsers;
};