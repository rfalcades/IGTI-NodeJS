import clientService from "../services/client.service.js";

async function createClient(req, res, next) {
    let client = req.body;

    try {
        if (
            !client.name ||
            !client.cpf ||
            !client.phone ||
            !client.email ||
            !client.address
        ) {
            throw new Error(
                "Name, CPF, Phone, Email e Address são obrigatórios."
            );
        }

        res.send(await clientService.createClient(client));
        logger.info(`POST /client - ${JSON.stringify(client)}`);
    } catch (err) {
        next(err);
    }
}

async function getClients(req, res, next) {
    try {
        res.send(await clientService.getClients());
        logger.info(`GET  /client`);
    } catch (err) {
        next(err);
    }
}

export default {
    createClient,
    getClients,
};
