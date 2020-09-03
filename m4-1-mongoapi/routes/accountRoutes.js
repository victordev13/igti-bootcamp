import express from 'express';
import { accountModel } from '../models/accountModel.js';

const app = express();
app.use(express.json());

// app.post('/account', async (req, res) => {
//     try {
//         const account = new accountModel(req.body);

//         await account.save();
//         res.send(account);
//     } catch (error) {
//         res.status(500).send(error);
//         console.log('Erro:' + error);
//     }
// });

// app.get('/accounts', async (req, res) => {
//     try {
//         const accounts = await accountModel.find({});
//         res.send(accounts);
//     } catch (error) {
//         res.status(500).send(error);
//         console.log('Erro:' + error);
//     }
// });

// app.get('/account/get/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const accounts = await accountModel.find({ _id: id });
//         res.send(accounts);
//     } catch (error) {
//         res.status(500).send(error);
//         console.log('Erro:' + error);
//     }
// });

// app.patch('/account/update/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const data = await accountModel.findByIdAndUpdate(
//             { _id: id },
//             req.body,
//             { new: true }
//         );
//         res.send(data);
//     } catch (error) {
//         res.status(500).send(error);
//         console.log('Erro:' + error);
//     }
// });

// app.delete('/account/delete/:id', async (req, res) => {
//     try {
//         const id = req.params.id;

//         const account = accountModel.findByIdAndDelete({ _id: id });
//         if (!account) {
//             res.status(404).send('Documento não encontrado!');
//         } else {
//             res.send(200).send();
//         }
//     } catch (error) {
//         res.status(500).send(error);
//         console.log('Erro:' + error);
//     }
// });

//Desafio

// Item 4 - Crie um endpoint para registrar um depósito em uma conta
app.patch('/account/deposit/', async (req, res, next) => {
    try {
        const account = req.body;
        let newDeposit = await validateAccount(account);
        newDeposit.balance += account.balance;
        newDeposit = new accountModel(newDeposit);
        await newDeposit.save();
        res.send(newDeposit);
        console.log(newDeposit);
    } catch (error) {
        next(error);
    }
});

// Item 5. Crie um endpoint para registrar um saque em uma conta.
app.patch('/account/withdraw/', async (req, res, next) => {
    try {
        const account = req.body;
        let newDrawMoney = await validateAccount(account);

        // valida saldo mais valor do saque antes de efetivar de fato o saque
        newDrawMoney.balance -= account.balance + 1; // valor + taxa de 1;
        if (newDrawMoney.balance < 0) {
            throw new Error('saldo insuficiente');
        }

        newDrawMoney = new accountModel(newDrawMoney);
        await newDrawMoney.save();
        res.send(newDrawMoney);
    } catch (error) {
        next(error);
    }
});

// Item 6. Crie um endpoint para consultar o saldo da conta
app.get('/account/checkBalance/', async (req, res, next) => {
    try {
        const account = req.body;
        const checkBalance = await validateAccount(account);
        res.send(checkBalance);
    } catch (error) {
        next(error);
    }
});

// Item 7. Crie um endpoint para excluir uma conta.
app.delete('/account/delete/', async (req, res, next) => {
    try {
        const account = req.body;
        let deleteAccount = await validateAccount(account);
        deleteAccount = new accountModel(deleteAccount);
        await deleteAccount.deleteOne();
        // res.status(200).send(
        //     `{"message": "Conta de ${deleteAccount.name}, Numero: ${deleteAccount.conta} da Agencia: ${deleteAccount.agencia} excluida com sucesso"}`
        // );
        deleteAccount = await accountModel.find({
            agencia: deleteAccount.agencia,
        });
        console.log(deleteAccount);
        res.send(deleteAccount);
    } catch (error) {
        next(error);
    }
});

// Item 8. Crie um endpoint para realizar transferências entre contas.
app.patch('/account/transfer/', async (req, res, next) => {
    try {
        const accounts = req.body;
        const transferMoney = accounts.contaOrigem.balance;
        let sourceAccount = await validateAccount(accounts.contaOrigem);
        let targetAccount = await validateAccount(accounts.contaDestino);

        // valida se sera cobrado valor de 8 caso contas sejam de agencias diferentes
        if (sourceAccount.agencia !== targetAccount.agencia) {
            sourceAccount.balance -= 8;
        }

        // subtrai do saldo da conta origem o valor da transferencia
        // valida saldo mais valor do saque antes de efetivar de fato o saque
        sourceAccount.balance -= transferMoney; // valor + taxa de 1;
        if (sourceAccount.balance < 0) {
            throw new Error('saldo insuficiente para efetuar a transferencia');
        }

        // deposita o valor da tranferencia na conta de destino
        targetAccount.balance += transferMoney;

        // salva as alteracoes conta origem
        sourceAccount = new accountModel(sourceAccount);
        await sourceAccount.save();

        // salva as alteracoes conta destino
        targetAccount = new accountModel(targetAccount);
        await targetAccount.save();

        //retorna a conta origem com saldo atualizado
        res.send(sourceAccount);
    } catch (error) {
        next(error);
    }
});

// Item 9. Crie um endpoint para consultar a média do saldo dos clientes de determinada agência.
app.get('/account/averageBalance/', async (req, res, next) => {
    try {
        const agencia = req.body.agencia;
        const averageBalance = await accountModel.aggregate([
            {
                $match: {
                    agencia,
                },
            },
            {
                $group: {
                    _id: '$agencia',
                    media: {
                        $avg: '$balance',
                    },
                },
            },
        ]);
        if (averageBalance.length === 0) {
            throw new Error('agencia nao encontrada');
        }
        res.send(averageBalance);
    } catch (error) {
        next(error);
    }
});

// Item 10. Crie um endpoint para consultar os clientes com o menor saldo em conta.
app.get('/account/topByBalance/', async (req, res, next) => {
    try {
        const limit = req.body.limit;
        const order = req.body.order;
        const topByBalance = await accountModel
            .find({})
            .limit(limit)
            .sort(order);
        if (topByBalance.length === 0) {
            throw new Error('nenhum cliente encontrado');
        }
        res.send(topByBalance);
    } catch (error) {
        next(error);
    }
});

// Item 11. Crie um endpoint para consultar os clientes mais ricos do banco.
app.get('/account/topRicher/', async (req, res, next) => {
    try {
        const limit = req.body.limit;
        const order = req.body.order;
        const topRicher = await accountModel.find({}).limit(limit).sort(order);
        if (topRicher.length === 0) {
            throw new Error('nenhum cliente encontrado');
        }
        res.send(topRicher);
    } catch (error) {
        next(error);
    }
});

// Item 12. Crie um endpoint que irá transferir o cliente com maior saldo em conta de cada agência para a agência private agencia=99.
app.get('/account/transferToPrivate/', async (req, res, next) => {
    try {
        let transferToPrivates = await Accounts.aggregate([
            {
                $group: {
                    _id: '$agencia',
                    balance: { $max: '$balance' },
                },
            },
        ]);

        for (const transferToPrivate of transferToPrivates) {
            const { _id, balance } = transferToPrivate;
            let newAccounts = await Accounts.findOne({
                agencia: _id,
                balance,
            });
            newAccounts.agencia = 99;
            await newAccounts.save();
        }
        transferToPrivates = await Accounts.find({
            agencia: 99,
        });
        res.send(transferToPrivates);
    } catch (error) {
        next(error);
    }
});

// valida se agencia/conta existe
const validateAccount = async (account) => {
    //traz apenas a agencia e a conta para consulta no BD;
    const { agencia, conta } = account;
    account = {
        agencia,
        conta,
    };
    try {
        console.log(account);
        account = await accountModel.findOne(account);
        if (!account) {
            throw new Error(`(${agencia}/${conta}) agencia/conta invalida`);
        }
        return account;
    } catch (error) {
        throw new Error(error.message);
    }
};

// funcao tratamento de erro
app.use((err, req, res, next) => {
    res.status(400).send({ error: err.message });
});

export { app as accountRouter };
