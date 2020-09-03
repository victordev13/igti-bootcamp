import express from 'express';
import { promises as fs, read } from 'fs';
import cors from 'cors';

const { writeFile, readFile } = fs;

const router = express.Router();

let corsOptions = {
    origin: 'http://teste.com',
    optionSucessStatus: 200,
};
router.post('/', async (req, res, next) => {
    try {
        let account = req.body;

        if (!account.name || account.balance === null) {
            throw new Error('Campos obrigatórios não preenchidos!');
        }
        const data = await readFile(global.fileName);
        const json = JSON.parse(data);

        account = {
            id: json.nextId++,
            name: account.name,
            balance: account.balance,
        };
        json.accounts.push(account);
        await writeFile(global.fileName, JSON.stringify(json, null, 2));

        res.send(account);

        logger.info(`POST /account - ${JSON.stringify(account)}`);
    } catch (error) {
        next(error);
    }
});
// cors() - habilitando somente este endpoint como global, corsOptions possui configurações de uma única origem
router.get('/', cors(corsOptions), async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        delete data.nextId;
        res.send(data);
        logger.info(`GET /account`);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const account = data.accounts.find(
            (account) => account.id === parseInt(req.params.id)
        );
        res.send(account);
        logger.info(`GET /account/id - ${req.params.id}`);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        data.accounts = data.accounts.filter(
            (account) => account.id !== parseInt(req.params.id)
        );
        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.end();
        logger.info(`DELETE /account/:id - ${req.params.id}`);
    } catch (error) {
        next(error);
    }
});
//PUT - Atualizar o recurso de forma integral
router.put('/', async (req, res, next) => {
    try {
        const account = req.body;

        if (
            !account.id ||
            !account.name ||
            !account.balance ||
            account.balance === null
        ) {
            throw new Error('ID, Name e Balance são obrigatórios!');
        }

        const data = JSON.parse(await readFile(global.fileName));
        const index = data.accounts.findIndex((a) => a.id === account.id);

        if (index === -1) {
            throw new Error('Registro não encontrado!');
        }

        data.accounts[index].name = account.name;
        data.accounts[index].balance = account.balance;

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(data.accounts[index]);

        logger.info(`PUT /account - ${JSON.stringify(account)}`);
    } catch (error) {
        next(error);
    }
});

//PATCH - Atualizações únicas, de um determinado parametro
router.patch('/updateBalance', async (req, res, next) => {
    try {
        const account = req.body;
        const data = JSON.parse(await readFile(global.fileName));
        const index = data.accounts.findIndex((a) => a.id === account.id);

        if (!account.id || !account.balance || account.balance === null) {
            throw new Error('ID e Balance são obrigatórios!');
        }
        if (index === -1) {
            throw new Error('Registro não encontrado!');
        }
        data.accounts[index].balance = account.balance;

        await writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.send(data.accounts[index]);
        logger.info(
            `PATCH /account/updateBalance - ${JSON.stringify(account.balance)}`
        );
    } catch (error) {
        next(error);
    }
});

router.use((err, req, res, next) => {
    global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

export default router;
