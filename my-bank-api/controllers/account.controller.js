import AccountService from "../services/account.services.js";

async function createAccount(req, res, next) {
    try {
        let account = req.body;

        if (!account.balance || !account.balance == null) {
            throw new Error("Name e Balance são obrigatórios!");
        }

        account = await AccountService.createAccount(account);

        res.send(account);
        logger.info(`POST /account - ${JSON.stringify(account)}`);
    } catch (error) {
        next(error);
    }
}

async function getAccounts(req, res, next) {
    try {
        res.send(await AccountService.getAccounts());
        logger.info("GET /account");
    } catch (error) {
        next(error);
    }
}

async function getAccount(req, res, next) {
    try {
        res.send(await AccountService.getAccount(req.params.id));
        logger.info("GET /account/:id");
    } catch (error) {
        next(error);
    }
}

async function deleteAccount(req, res, next) {
    try {
        await AccountService.deleteAccount(req.params.id);
        res.end();
        logger.info(`DELETE /account/:id - ${req.params.id}`);
    } catch (error) {
        next(error);
    }
}

async function updateAccount(req, res, next) {
    try {
        const account = req.body;

        if (!account.id || !account.balance || !account.balance == null) {
            throw new Error("Id, Name e Balance são obrigatórios!");
        }

        res.send(await AccountService.updateAccount(account));

        logger.info(`PUT /account - ${JSON.stringify(account)}`);
    } catch (error) {
        next(error);
    }
}

async function updateBalance(req, res, next) {
    try {
        const account = req.body;

        if (!account.id || account.balance == null) {
            throw new Error("Id e Balance são obrigatórios!");
        }

        res.send(await AccountService.updateBalance(account));

        logger.info(`PATCH /account - ${JSON.stringify(account)}`);
    } catch (error) {
        next(error);
    }
}

export default {
    createAccount,
    getAccounts,
    getAccount,
    deleteAccount,
    updateAccount,
    updateBalance,
};
