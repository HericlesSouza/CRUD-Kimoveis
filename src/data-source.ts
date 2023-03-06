import "dotenv/config";
import path from "path";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

const dataSourceConfig = (): DataSourceOptions => {
    const entitiesPath = path.join(__dirname, "./entities/**.{ts,js}");
    const migrationsPath = path.join(__dirname, "./migrations/**.{ts,js}");

    const dbURL = process.env.DATABASE_URL;

    if (!dbURL) {
        throw new Error("Env var DATABASE_URL does not exists");
    }

    const nodeEnv = process.env.NODE_ENV;

    if (nodeEnv === "test") {
        return {
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: [entitiesPath]
        };
    }

    return {
        type: "postgres",
        url: dbURL,
        synchronize: false,
        logging: true,
        entities: [entitiesPath],
        migrations: [migrationsPath]
    };
};

const AppDataSource = new DataSource(dataSourceConfig());

export {
    AppDataSource
};