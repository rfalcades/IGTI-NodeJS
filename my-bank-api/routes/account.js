import express from "express";
import { promises as fs, write } from "fs";

const { readFile, writeFile } = fs;

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        let account = req.body;
        const data = JSON.parse(await readFile("accounts.json"));

        account = { id: data.nextId++, ...account };
        data.accounts.push(account);

        await writeFile("accounts.json", JSON.stringify(data));

        res.send(account);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }

    res.end();
});

export default router;
