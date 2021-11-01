import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

async function getPedidos() {
    const data = JSON.parse(await readFile(global.fileName));
    return data.pedidos;
}

async function getPedido(id) {
    const pedidos = await getPedidos();
    const pedido = pedidos.find((p) => p.id === parseInt(id));

    if (pedido) {
        return pedido;
    }

    throw new Error("Registro não encontrado!");
}

async function insertPedido(pedido) {
    const data = JSON.parse(await readFile(global.fileName));

    pedido = {
        id: data.nextId++,
        cliente: pedido.name,
        produto: pedido.balance,
        valor: pedido.valor,
        entregue: false,
        Timestamp: new Date(),
    };

    data.pedidos.push(pedido);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    return pedido;
}

async function deletePedido(id) {
    const data = JSON.parse(await readFile(global.fileName));

    data.pedidos = data.pedidos.filter((p) => p.id !== parseInt(id));

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
}

async function updatePedido(pedido) {
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.pedidos.findIndex((p) => p.id === pedido.id);

    if (index === -1) {
        throw new Error("Registro não encontrado!");
    }

    data.pedidos[index].cliente = pedido.cliente;
    data.pedidos[index].produto = pedido.produto;
    data.pedidos[index].valor = pedido.valor;
    data.pedidos[index].entregue = pedido.entregue;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    return data.pedidos[index];
}

async function updateEntregue(id, entregue) {
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.pedidos.findIndex((p) => p.id === parseInt(id));

    if (index === -1) {
        throw new Error("Registro não encontrado!");
    }

    data.pedidos[index].entregue = entregue;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    return data.pedidos[index];
}

export default {
    getPedidos,
    getPedido,
    insertPedido,
    deletePedido,
    updatePedido,
    updateEntregue,
};
