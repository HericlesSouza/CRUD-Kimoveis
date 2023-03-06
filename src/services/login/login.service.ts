import { compare } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { TLogin } from "../../interfaces/login.interface";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const loginService = async (loginData: TLogin): Promise<string> => {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
        where: {
            email: loginData.email,
        },
        withDeleted: true
    });

    if (!user || user.deletedAt) {
        throw new AppError("Invalid credentials", 401);
    }

    const checkPassword = await compare(loginData.password, user.password);

    if (!checkPassword) {
        throw new AppError("Invalid credentials", 401);
    }

    console.log("oDQJWUIDHWQIDWGQUYDHIQJi");

    const token = jwt.sign(
        {
            id: user.id,
            admin: user.admin
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: "24h",
            subject: String(user.id)
        }
    );

    return token;
};