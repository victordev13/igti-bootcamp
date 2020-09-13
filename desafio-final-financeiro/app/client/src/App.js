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
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalIsEdit, setModalIsEdit] = React.useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const handleModalSave = (data) => {
        !modalIsEdit
            ? TransactionService.create(data)
            : TransactionService.update(currentTransaction.data._id, data);
    };

    const handleEditItem = async (id) => {
        setModalIsEdit(true);
        const data = await TransactionService.getById(id);
        setCurrentTransaction(data);
        setIsModalOpen(true);
    };
    const handleRemoveItem = async (id) => {
        await TransactionService.remove(id).then(() =>
            console.log('ID:' + id + ' deletado')
        );
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
            <ListItems
                items={transactions}
                editItem={handleEditItem}
                removeItem={handleRemoveItem}
            />
            {isModalOpen && (
                <MyModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onSave={handleModalSave}
                    currentTransaction={currentTransaction}
                    isEdit={modalIsEdit}
                    update={findDataByPeriod}
                />
            )}
        </div>
    );
}
