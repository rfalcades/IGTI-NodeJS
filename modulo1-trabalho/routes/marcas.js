import express from "express";
import { promises as fs } from "fs";

const { readFile } = fs;

const router = express.Router();

var data;

router.get("/maisModelos", async (req, res, next) => {
    try {
        data = JSON.parse(await readFile(global.fileName));

        const result = await GetMarcaMaisModelos();

        res.send(result);
    } catch (error) {
        next(error);
    }
});

router.get("/menosModelos", async (req, res, next) => {
    try {
        data = JSON.parse(await readFile(global.fileName));

        const result = await GetMarcaMenosModelos();

        res.send(result);
    } catch (error) {
        next(error);
    }
});

router.get("/listaMaisModelos/:qtde", async (req, res, next) => {
    try {
        data = JSON.parse(await readFile(global.fileName));

        const result = await GetMarcaMaisModelos(parseInt(req.params.qtde));

        res.send(result);
    } catch (error) {
        next(error);
    }
});

router.get("/listaMenosModelos/:qtde", async (req, res, next) => {
    try {
        data = JSON.parse(await readFile(global.fileName));

        const result = await GetMarcaMenosModelos(parseInt(req.params.qtde));

        res.send(result);
    } catch (error) {
        next(error);
    }
});

router.post("/listaModelos", async (req, res, next) => {
    try {
        data = JSON.parse(await readFile(global.fileName));

        const result = await GetModelos(req.body.nomeMarca);

        res.send(result);
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

//------------ Logica ---------
async function GetArrayMarcas(asc) {
    if (!asc) asc = 1;

    let result = {
        marcas: [],
    };

    data.forEach((element) => {
        result.marcas.push({
            qtd: element.models.length,
            marca: element.brand,
        });
    });

    result.marcas.sort((e1, e2) => {
        if (e1.qtd > e2.qtd) return 1 * asc;
        if (e1.qtd < e2.qtd) return -1 * asc;
        if (e1.marca < e2.marca) return -1;
        if (e1.marca > e2.marca) return 1;

        return 0;
    });

    return result;
}

async function GetMarcaMaisModelos(qtde) {
    if (!qtde) qtde = 1;

    let r = await GetArrayMarcas(-1);
    let result = [];

    r.marcas.slice(0, qtde).forEach((e) => {
        if (qtde > 1) result.push(`${e.marca} - ${e.qtd}`);
        else result.push(`${e.marca}`);
    });

    return result;
}

async function GetMarcaMenosModelos(qtde) {
    if (!qtde) qtde = 1;

    let r = await GetArrayMarcas();
    let result = [];

    r.marcas.slice(0, qtde).forEach((e) => {
        if (qtde > 1) result.push(`${e.marca} - ${e.qtd}`);
        else result.push(`${e.marca}`);
    });

    return result;
}

async function GetModelos(marca) {
    let modelos = data.find(
        (e) => e.brand.toUpperCase() === marca.toUpperCase()
    );

    if (!modelos) modelos = { models: [] };

    return modelos.models;
}
