import express from "express";
import winston from "winston";
import accountsRouter from "./routes/account.routes.js";
import { promises as fs } from "fs";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import AccountService from "./services/account.services.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerFile = require("./swagger_output.json");

const { readFile, writeFile } = fs;

global.fileName = "accounts.json";

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "my-bank-api.log" }),
    ],
    format: combine(label({ label: "my-bank-api" }), timestamp(), myFormat),
});

const schema = buildSchema(`
     type Account {
         id: Int
         name: String
         balance: Float
     }

     input AccountInput {
         id: Int
         name: String
         balance: Float         
     }

     type Query {
         getAccounts: [Account]
         getAccount(id: Int): Account
     }

     type Mutation {
         createAccount(account: AccountInput): Account
         deleteAccount(id: Int): Boolean
         updateAccount(account: AccountInput): Account
     }
`);

const root = {
    getAccounts: () => AccountService.getAccounts(),
    getAccount(args) {
        return AccountService.getAccount(args.id);
    },
    createAccount({ account }) {
        return AccountService.createAccount(account);
    },
    deleteAccount(args) {
        AccountService.updateAccount(account);
    },
    updateAccount({ account }) {
        return AccountService.updateAccount(account);
    },
};

const app = express();
app.use(express.json());
app.use(cors());

app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use("/account", accountsRouter);

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true,
    })
);

app.listen(3000, async () => {
    try {
        await readFile(global.fileName);
        logger.info("API Started!");
    } catch (error) {
        const initialJson = {
            nextId: 1,
            accounts: [],
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
