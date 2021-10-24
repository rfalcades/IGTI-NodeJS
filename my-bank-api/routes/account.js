import express from "express";
import { promises as fs, write } from "fs";
import { maxHeaderSize } from "http";

const { readFile, writeFile } = fs;

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        let account = req.body;
        const data = JSON.parse(await readFile(global.fileName));

        account = { id: data.nextId++, ...account };
        data.accounts.push(account);

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(account);
        logger.info(`POST /account - ${JSON.stringify(account)}`);
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        delete data.nextId;
        res.send(data);
        logger.info("GET /account");
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));

        const account = data.accounts.find(
            (account) => account.id === parseInt(req.params.id)
        );

        res.send(account);
        logger.info("GET /account/:id");
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));

        data.accounts = data.accounts.filter(
            (account) => account.id !== parseInt(req.params.id)
        );

        await writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.end();
        logger.info(`DELETE /account/:id - ${req.params.id}`);
    } catch (error) {
        next(error);
    }
});

router.put("/", async (req, res, next) => {
    try {
        const account = req.body;

        const data = JSON.parse(await readFile(global.fileName));
        const index = data.accounts.findIndex((a) => a.id === account.id);

        data.accounts[index] = account;
        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(account);

        logger.info(`PUT /account - ${JSON.stringify(account)}`);
    } catch (error) {
        next(error);
    }
});

router.patch("/updateBalance", async (req, res, next) => {
    try {
        const account = req.body;

        const data = JSON.parse(await readFile(global.fileName));
        const index = data.accounts.findIndex((a) => a.id === account.id);

        data.accounts[index].balance = account.balance;
        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(data.accounts[index]);

        logger.info(`PATCH /account - ${JSON.stringify(account)}`);
    } catch (error) {
        next(error);
    }
});

router.use((err, req, res, next) => {
    global.logger.error(
        `${req.method} ${req.baseUrl} - ${console.err.message}`
    );
    res.status(400).send({ error: error.message });
});

export default router;
