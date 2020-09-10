import React from 'react';
import PeriodFilter from './components/PeriodFilter';
import DataBar from './components/DataBar';
import ListItems from './components/ListItems/ListItems';

import TransactionService from './services/TransactionService';
import NewLaunchAndFilter from './components/NewLaunchAndFilter/NewLaunchAndFilter';

export default function App() {
    const getCurrentMonth = () => {
        const currentDate = new Date();
        return `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    };
    const [currentMonth, setCurrentMonth] = React.useState(getCurrentMonth);

    //

    const findDataByPeriod = (period) => {
        console.log(period);

        TransactionService.getPeriod(period)
            .then((response) => {
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    //
    return (
        <div className="container center">
            <h1 style={{ fontSize: '1.7rem' }}>Controle Financeiro Pessoal</h1>
            <PeriodFilter
                filter={findDataByPeriod}
                currentMonth={currentMonth}
            />
            <DataBar />
            <NewLaunchAndFilter />
            <ListItems />
        </div>
    );
}
