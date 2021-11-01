import express from "express";
import winston from "winston";
import deliveryRouter from "./routes/delivery.routes.js";
import { promises as fs } from "fs";
// import cors from "cors";
// import swaggerUI from "swagger-ui-express";
// import { buildSchema } from "graphql";
// import { graphqlHTTP } from "express-graphql";
// import AccountService from "./services/account.services.js";
// import Schema from "./schema/index.js";

// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const swaggerFile = require("./swagger_output.json");

const { readFile, writeFile } = fs;

// global.fileName = "./data/pedidos.json";
global.fileName = "./modulo1-desafio/data/pedidos.json";

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "delivery-api.log" }),
    ],
    format: combine(label({ label: "delivery-api" }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());
// app.use(cors());

// app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use("/delivery", deliveryRouter);

// app.use(
//     "/graphql",
//     graphqlHTTP({
//         schema: Schema,
//         // rootValue: root,
//         graphiql: true,
//     })
// );

app.listen(3000, async () => {
    try {
        await readFile(global.fileName);
        logger.info("API Started!");
    } catch (error) {
        const initialJson = {
            nextId: 1,
            pedidos: [],
        };
        writeFile(global.fileName, JSON.stringify(initialJson))
            .then(() => {
                logger.info("API Started and File Created!");
            })
            .catch((err) => {
                logger.error(err);
            });
    }
});
