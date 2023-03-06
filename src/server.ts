import "dotenv/config";
import app from "./app";
import { AppDataSource } from "./data-source";


AppDataSource.initialize().then(() => {
    console.log("Database connected!");

    const port = process.env.PORT;

    if (!port) {
        throw new Error("Env var PORT does not exists");
    }

    app.listen(port, () => {
        console.log(`Server is running at port: ${port}`);
    });
}).catch(err => {
    console.log(err);
});