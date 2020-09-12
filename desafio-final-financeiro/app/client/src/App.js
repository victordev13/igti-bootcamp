import React from 'react';
import PeriodFilter from './components/PeriodFilter';
import DataBar from './components/DataBar';
import ListItems from './components/ListItems/ListItems';

import TransactionService from './services/TransactionService';
import NewLaunchAndFilter from './components/NewLaunchAndFilter/NewLaunchAndFilter';
import MyModal from './components/MyModal';

export default function App() {
    const findDataByPeriod = async (period) => {
        period = period ? period : '2020-09';
        console.log(period);

        const data = await TransactionService.getByPeriod(period)
            .then((response) => {
                console.log(response.data);
                setTransactions(response.data.transactions);
            })
            .catch((e) => {
                console.log('Erro:' + e);
            });
    };
    const [transactions, setTransactions] = React.useState([]);

    const [currentTransaction, setCurrentTransaction] = React.useState([]);

    const itemsTransactions = [
        { id: 0, title: 'Item 1', description: 'teste', value: 20, type: '+' },
        { id: 1, title: 'Item 1', description: 'teste', value: 20, type: '+' },
        { id: 2, title: 'Item 1', description: 'teste', value: 20, type: '-' },
        { id: 3, title: 'Item 1', description: 'teste', value: 20, type: '+' },
        { id: 4, title: 'Item 1', description: 'teste', value: 20, type: '-' },
    ];
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalIsEdit, setModalIsEdit] = React.useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const handleModalSave = null;

    const handleEditItem = async (id) => {
        const data = await TransactionService.getById(id);
        setCurrentTransaction(data);
        setIsModalOpen(true);
        setModalIsEdit(true);
    };

    const newTransaction = () => {
        setIsModalOpen(true);
        setModalIsEdit(false);
    };
    return (
        <div className="container center">
            <h1 style={{ fontSize: '1.7rem' }}>Controle Financeiro Pessoal</h1>
            <PeriodFilter filter={findDataByPeriod} />
            <DataBar />
            <NewLaunchAndFilter newTransaction={newTransaction} />
            <ListItems items={transactions} editItem={handleEditItem} />
            {isModalOpen && (
                <MyModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onSave={handleModalSave}
                    currentTransaction={currentTransaction}
                    isEdit={modalIsEdit}
                />
            )}
        </div>
    );
}
