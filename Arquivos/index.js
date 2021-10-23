import { promises as fs, write } from "fs";

// init();
writeReadJson();

async function init() {
    try {
        await fs.writeFile("teste.txt", "bla bla bla");
        await fs.appendFile("teste.txt", "\nteste append file");
        const data = await fs.readFile("teste.txt", "utf-8");
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

async function writeReadJson() {
    try {
        const arrayCarros = ["Gol", "Palio", "Uno"];
        const obj = {
            carros: arrayCarros,
        };

        await fs.writeFile("teste.json", JSON.stringify(obj));

        const data = JSON.parse(await fs.readFile("teste.json"));
        data.carros.push("Sandero");

        await fs.writeFile("teste.json", JSON.stringify(data));

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
