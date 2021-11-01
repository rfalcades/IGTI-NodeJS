import DeliveryRepository from "../repositories/delivery.repository.js";

async function createPedido(pedido) {
    return await DeliveryRepository.insertPedido(pedido);
}

async function getPedidos() {
    return await DeliveryRepository.getPedidos();
}

async function getPedido(id) {
    return await DeliveryRepository.getPedido(id);
}

async function deletePedido(id) {
    return await DeliveryRepository.deletePedido(id);
}

async function updatePedido(pedido) {
    return await DeliveryRepository.updatePedido(pedido);
}

async function updateEntregue(id, entregue) {
    return await DeliveryRepository.updateEntregue(id, entregue);
}

async function somarPedidos(nomeCliente) {
    const pedidos = await DeliveryRepository.getPedidos();

    let valorTotalPedidos = 0;

    pedidos.forEach((p) => {
        if (p.cliente === nomeCliente && p.entregue)
            valorTotalPedidos += p.valor;
    });

    return valorTotalPedidos;
}

async function somarPedidosProduto(nomeProduto) {
    const pedidos = await DeliveryRepository.getPedidos();

    let valorTotalPedidos = 0;

    pedidos.forEach((p) => {
        if (p.produto === nomeProduto && p.entregue)
            valorTotalPedidos += p.valor;
    });

    return valorTotalPedidos;
}

async function produtosMaisVendidos() {
    const pedidos = await DeliveryRepository.getPedidos();

    let result = [];

    pedidos
        .filter((p) => p.entregue)
        .forEach((p) => {
            let item = result.find((i) => i.produto === p.produto);

            if (!item) {
                item = {
                    produto: p.produto,
                    qtde: 1,
                };
                result.push(item);
            } else item.qtde += 1;
        });

    result.sort((e1, e2) => {
        if (e1.qtde > e2.qtde) return -1;
        if (e1.qtde < e2.qtde) return 1;
        return 0;
    });

    let result2 = [];
    result.forEach((p) => {
        result2.push(`${p.produto} - ${p.qtde}`);
    });

    return result2;
}

export default {
    createPedido,
    getPedidos,
    getPedido,
    deletePedido,
    updatePedido,
    updateEntregue,
    somarPedidos,
    somarPedidosProduto,
    produtosMaisVendidos,
};
