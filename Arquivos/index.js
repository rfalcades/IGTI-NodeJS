import { promises as fs, write } from "fs";

init();

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
