import express from "express";
import PedidoController from "../controllers/delivery.controller.js";

const router = express.Router();

router.post("/", PedidoController.createPedido);
router.get("/", PedidoController.getPedidos);
router.get("/:id", PedidoController.getPedido);
router.delete("/:id", PedidoController.deletePedido);
router.put("/", PedidoController.updatePedido);
router.patch("/updateEntregue", PedidoController.updateEntregue);
router.get(
    "/totalCliente/:nomeCliente",
    PedidoController.somarPedidosPorCliente
);

router.use((err, req, res, next) => {
    global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

export default router;
