const mongoose = require('mongoose');

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');
const DATE_LENGTH = 8;
const ID_LENGTH = 24;

const create = async (req, res) => {
    const { category, date, type } = req.body;

    if (date.length < DATE_LENGTH) {
        res.status(500).send({ error: 'Formato de data inválida!' });
    }

    if (!req.body) {
        res.status(500).send({ error: 'Nenhum dado recebido!' });
    }

    try {
        const transaction = { category, ...getAllDateFields(date), type };
        console.log(transaction);
        let newTransaction = new TransactionModel(transaction);
        newTransaction = await newTransaction.save();
        res.status(200).send({ message: 'Ok', data: newTransaction });
    } catch (error) {
        res.status(500).send({
            error: 'Ocorreu um erro na inserção! :' + error,
        });
    }
};

const findByPeriod = async (req, res) => {
    const period = req.query.period;
    if (!period) {
        res.status(500).send({
            error:
                'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm.',
        });
    }

    try {
        const data = await TransactionModel.find({ yearMonth: period });
        !data
            ? res.status(500).send({ message: 'Nenhum dado encontrado.' })
            : res.send({ length: data.length, transactions: [...data] });
    } catch (error) {
        res.status(500).send({
            error: 'Erro ao consultar período informado!',
        });
    }
};

const findOne = async (req, res) => {
    const id = req.params.id;
    if (validateId(id)) {
        res.status(500).send({
            error: 'É necessário informar o id do item.',
        });
        return;
    }

    try {
        const data = await TransactionModel.findById(id);
        !data
            ? res.status(500).send({ message: 'Nenhum dado encontrado.' })
            : res.send(data);
    } catch (error) {
        res.status(500).send({
            error: 'Erro ao consultar item!',
        });
    }
};

const remove = async (req, res) => {
    const id = req.body.id;
    if (validateId(id)) {
        res.status(500).send({
            error: 'É necessário informar o id do item.',
        });
        return;
    }
    try {
        const data = await TransactionModel.findByIdAndDelete(id);
        if (!data) {
            throw new Error('não encontrado');
        }
        res.send({ message: 'ok' });
    } catch (error) {
        res.status(500).send({
            error: 'Erro ao excluir item id:' + id + ' / ' + error,
        });
    }
};

const update = async (req, res) => {
    const id = req.body.id;

    if (validateId(id)) {
        res.status(500).send({
            error: 'É necessário informar o id do item.',
        });
        return;
    }
    if (!req.body) res.status(400).send('Dados não informados.');

    try {
        const updatedTransaction = await TransactionModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        res.send(updatedTransaction);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao atualizar item id: ' + id });
    }
};

//Funções auxiliares

const getAllDateFields = (date) => {
    let allDate = new Date(date.toString());
    allDate = {
        year: allDate.getFullYear(),
        month: allDate.getMonth() + 1,
        day: allDate.getDate(),
        yearMonth: `${allDate.getFullYear()}-${allDate.getMonth() + 1}`,
        yearMonthDay: `${allDate.getFullYear()}-${
            allDate.getMonth() + 1
        }-${allDate.getDate()}`,
    };
    return ({ year, month, day, yearMonth, yearMonthDay } = allDate);
};

const validateId = (id) => {
    return !id || id.length < ID_LENGTH;
};
module.exports = { create, findByPeriod, findOne, remove, update };
