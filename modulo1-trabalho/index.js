import { promises as fs } from "fs";

var data;

await init();

console.log("Marca mais modelos :" + (await GetMarcaMaisModelos()));
console.log("5 Marcas mais modelos :" + (await GetMarcaMaisModelos(5)));

console.log("5 Marcas menos modelos :" + (await GetMarcaMenosModelos(5)));
console.log("Marca mais modelos :" + (await GetMarcaMenosModelos()));

async function init() {
    try {
        data = JSON.parse(await fs.readFile("car-list.json", "utf-8"));
    } catch (error) {
        console.log(error);
    }
}

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
        // result.push({ marca: e.marca, qtd: e.qtd });
        // result.push(`${e.marca} - ${e.qtd}`);
        result.push(`${e.marca} - ${e.qtd}`);
    });

    return result;
}

async function GetMarcaMenosModelos(qtde) {
    if (!qtde) qtde = 1;

    let r = await GetArrayMarcas();
    let result = [];

    r.marcas.slice(0, qtde).forEach((e) => {
        //result.push(e.marca);
        result.push(`${e.marca} - ${e.qtd}`);
    });

    return result;
}
