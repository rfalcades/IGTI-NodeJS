import { promises as fs } from "fs";

var data;

await init();

// console.log(await GetArrayMarcas());

console.log(await GetMarcaMaisModelos());
// console.log(await GetMarcaMenosModelos());
// console.log(await GetMarcaMaisModelosN(5));

async function init() {
    try {
        data = JSON.parse(await fs.readFile("car-list.json", "utf-8"));
    } catch (error) {
        console.log(error);
    }
}

// 1 Criar uma função que retorne o nome da marca que mais possui modelos.
async function GetArrayMarcas() {
    let result = {
        marcas: [],
    };

    data.forEach((element) => {
        result.marcas.push({
            marca: element.brand,
            qtd: element.models.length,
        });
    });

    result.marcas.sort((e1, e2) => {
        if (e1.qtd > e2.qtd) {
            return -1;
        }
        if (e1.qtd < e2.qtd) {
            return 1;
        }
        return 0;
    });

    return result;
}

async function GetArrayOrdenado() {
    let result = await GetArrayMarcas();

    const map = new Map();

    result.marcas.forEach((e) => {
        let key = e.qtd;

        if (!map.has(key)) map.set(key, []);
        map.get(key).push(e.marca);
    });

    let r2 = {
        result: [],
    };

    map.forEach((value, key) => {
        r2.result.push({
            qtd: key,
            marcas: value,
        });
    });

    r2.result.sort((e1, e2) => {
        if (e1.qtd > e2.qtd) {
            return -1;
        }
        if (e1.qtd < e2.qtd) {
            return 1;
        }
        return 0;
    });

    return r2;
}

async function GetMarcaMaisModelos() {
    let r = await GetArrayMarcas();
    let result = [];

    r.marcas.forEach((e) => {
        let i = result.find((r) => r.qtd === e.qtd);

        if (!i) {
            i = { qtd: e.qtd, marca: [] };
            result.push(i);
        }

        i.marca.push(e.marca);

        console.log(i);
    });

    //  console.log(result);
}

async function GetMarcaMenosModelos() {
    let r = await GetArrayOrdenado();
    return r.result[r.result.length - 1].marcas;
}

async function GetMarcaMaisModelosN(qtd) {
    let r = await GetArrayOrdenado();

    let r2 = [];

    r.result.slice(0, qtd).forEach((e) => {
        r2.push(e.marcas);
    });

    return r2;
}
