import DeliveryService from "../services/delivery.services.js";

async function createPedido(req, res, next) {
    try {
        let pedido = req.body;

        if (!pedido.cliente || !pedido.produto || pedido.valor == null) {
            throw new Error("Cliente, produto e valor são obrigatórios!");
        }

        pedido = await DeliveryService.createPedido(pedido);

        res.send(pedido);
        logger.info(`POST /pedido - ${JSON.stringify(pedido)}`);
    } catch (error) {
        next(error);
    }
}

async function getPedidos(req, res, next) {
    try {
        res.send(await DeliveryService.getPedidos());
        logger.info("GET /pedidos");
    } catch (error) {
        next(error);
    }
}

async function getPedido(req, res, next) {
    try {
        res.send(await DeliveryService.getPedido(req.params.id));
        logger.info("GET /pedido/:id");
    } catch (error) {
        next(error);
    }
}

async function deletePedido(req, res, next) {
    try {
        await DeliveryService.deletePedido(req.params.id);
        res.end();
        logger.info(`DELETE /pedido/:id - ${req.params.id}`);
    } catch (error) {
        next(error);
    }
}

async function updatePedido(req, res, next) {
    try {
        const pedido = req.body;

        if (
            !pedido.id ||
            !pedido.cliente ||
            !pedido.produto ||
            pedido.valor == null
        ) {
            throw new Error("Id, Cliente, produto e valor são obrigatórios!");
        }

        res.send(await DeliveryService.updatePedido(pedido));

        logger.info(`PUT /pedido - ${JSON.stringify(pedido)}`);
    } catch (error) {
        next(error);
    }
}

async function updateEntregue(req, res, next) {
    try {
        const pedido = req.body;

        if (!pedido.id || pedido.entregue == null) {
            throw new Error("Id e Entregue são obrigatórios!");
        }

        res.send(
            await DeliveryService.updateEntregue(pedido.id, pedido.entregue)
        );

        logger.info(`PATCH /pedido - ${JSON.stringify(pedido)}`);
    } catch (error) {
        next(error);
    }
}

async function somarPedidosPorCliente(req, res, next) {
    try {
        const cliente = req.params.nomeCliente;
        const resultSoma = await DeliveryService.getTotalCliente(cliente);
        res.send(`Valor total pedidos cliente ${cliente} : ${resultSoma}`);
        logger.info("GET /somarPedidosPorCliente");
    } catch (error) {
        next(error);
    }
}

async function somarPedidosPorProduto(req, res, next) {
    try {
        const produto = req.params.nomeProduto;
        const resultSoma = await DeliveryService.somarPedidosProduto(produto);
        res.send(`Valor total pedidos produto ${produto} : ${resultSoma}`);
        logger.info("GET /somarPedidosPorProduto");
    } catch (error) {
        next(error);
    }
}

async function produtosMaisVendidos(req, res, next) {
    try {
        const result = await DeliveryService.produtosMaisVendidos();
        res.send(`Ranking produtos: ${result}`);
        logger.info("GET /produtosMaisVendidos");
    } catch (error) {
        next(error);
    }
}

export default {
    createPedido,
    getPedidos,
    getPedido,
    deletePedido,
    updatePedido,
    updateEntregue,
    somarPedidosPorCliente,
    somarPedidosPorProduto,
    produtosMaisVendidos,
};
