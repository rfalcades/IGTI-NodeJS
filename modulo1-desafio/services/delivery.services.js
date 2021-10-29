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

export default {
    createPedido,
    getPedidos,
    getPedido,
    deletePedido,
    updatePedido,
    updateEntregue,
};
