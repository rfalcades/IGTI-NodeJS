import { promises as fs } from "fs";
import express from "express";
import marcasRouter from "./routes/marcas.js";
import cors from "cors";

const { readFile, writeFile } = fs;

global.fileName = "car-list.json";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/marcas", marcasRouter);

app.listen(3000, async () => {
    try {
        await readFile(global.fileName);
        console.log("API Started!");
        //logger.info("API Started!");
    } catch (error) {
        console.log(console.error);
        //logger.error(error);
    }
});
