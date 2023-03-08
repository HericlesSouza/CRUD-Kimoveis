import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";

export const deleteUserService = async (idUser: number): Promise<void> => {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
        where: {
            id: idUser
        },
        withDeleted: true
    });

    if (user?.deletedAt) {
        throw new AppError("User not found", 404);
    }

    await userRepository.softRemove(user!);
};