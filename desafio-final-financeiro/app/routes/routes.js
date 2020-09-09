const express = require('express');
const transactionRouter = express.Router();
const TransactionModel = require('../models/TransactionModel.js');
const TransactionService = require('../services/transactionService.js');

transactionRouter.post('/', TransactionService.create);

transactionRouter.get('/', TransactionService.findByPeriod);

transactionRouter.get('/:id', TransactionService.findOne);

transactionRouter.delete('/', TransactionService.remove);

transactionRouter.put('/', TransactionService.update);

transactionRouter.use('/', (req, res) => {
    res.send({ message: 'API em execução' });
});

module.exports = transactionRouter;
