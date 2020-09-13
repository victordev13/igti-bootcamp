import React from 'react';
import css from './periodFilter.module.css';

export default function PeriodFilter({ filter }) {
    const currentDate = new Date();

    const findByCurrentMonth = async () => {
        const data = await filter(getCurrentMonth());
        console.log(data);
        return data;
    };

    const years = [
        currentDate.getFullYear() - 1,
        currentDate.getFullYear(),
        currentDate.getFullYear() + 1,
    ];

    const textMonths = [
        'JAN',
        'FEV',
        'MAR',
        'ABR',
        'MAI',
        'JUN',
        'JUL',
        'AGO',
        'SET',
        'OUT',
        'NOV',
        'DEZ',
    ];
    let allDates = [];
    let index = 1;
    years.forEach((year) => {
        textMonths.forEach((month) => {
            const date = `${year}-${index.toString().padStart(2, '0')}`;
            const description = `${month}/${year}`;
            allDates.push({ date, description, index: index++ });
        });
        index = 1;
    });

    // const months = [
    //     { text: 'Jan/2019', value: '2019-01' },
    //     { text: 'Fev/2019', value: '2019-02' },
    //     { text: 'Mar/2019', value: '2019-03' },
    //     { text: 'Abr/2019', value: '2019-04' },
    //     { text: 'Mai/2019', value: '2019-05' },
    //     { text: 'Jun/2019', value: '2019-06' },
    //     { text: 'Jul/2019', value: '2019-07' },
    //     { text: 'Ago/2019', value: '2019-08' },
    //     { text: 'Set/2019', value: '2019-09' },
    //     { text: 'Out/2019', value: '2019-10' },
    //     { text: 'Nov/2019', value: '2019-11' },
    //     { text: 'Dez/2019', value: '2019-12' },

    //     { text: 'Jan/2020', value: '2020-01' },
    //     { text: 'Fev/2020', value: '2020-02' },
    //     { text: 'Mar/2020', value: '2020-03' },
    //     { text: 'Abr/2020', value: '2020-04' },
    //     { text: 'Mai/2020', value: '2020-05' },
    //     { text: 'Jun/2020', value: '2020-06' },
    //     { text: 'Jul/2020', value: '2020-07' },
    //     { text: 'Ago/2020', value: '2020-08' },
    //     { text: 'Set/2020', value: '2020-09' },
    //     { text: 'Out/2020', value: '2020-10' },
    //     { text: 'Nov/2020', value: '2020-11' },
    //     { text: 'Dez/2020', value: '2020-12' },

    //     { text: 'Jan/2021', value: '2021-01' },
    //     { text: 'Fev/2021', value: '2021-02' },
    //     { text: 'Mar/2021', value: '2021-03' },
    //     { text: 'Abr/2021', value: '2021-04' },
    //     { text: 'Mai/2021', value: '2021-05' },
    //     { text: 'Jun/2021', value: '2021-06' },
    //     { text: 'Jul/2021', value: '2021-07' },
    //     { text: 'Ago/2021', value: '2021-08' },
    //     { text: 'Set/2021', value: '2021-09' },
    //     { text: 'Out/2021', value: '2021-10' },
    //     { text: 'Nov/2021', value: '2021-11' },
    //     { text: 'Dez/2021', value: '2021-12' },
    // ];

    const handleSelectPeriod = (event) => {
        const period = event.target.value;
        filter(period);
        setmonthSelected(period);
    };
    const getCurrentMonth = () => {
        const month = `${currentDate.getFullYear()}-${(
            currentDate.getMonth() + 1
        )
            .toString()
            .padStart(2, '0')}`;

        filter(month);
        return month;
    };
    const [monthSelected, setmonthSelected] = React.useState(getCurrentMonth);

    const previousPeriod = () => {};
    const nextPeriod = () => {};

    return (
        <div className={css.flexRow}>
            <a className="waves-effect waves-light btn">
                <i className="material-icons " onClick={previousPeriod}>
                    chevron_left
                </i>
            </a>

            <select
                onChange={handleSelectPeriod}
                className="browser-default"
                value={monthSelected}
            >
                {allDates.map((option, index) => {
                    return (
                        <option key={index} value={option.date}>
                            {option.description}
                        </option>
                    );
                })}
            </select>
            <a className="waves-effect waves-light btn">
                <i className="material-icons" onClick={nextPeriod}>
                    chevron_right
                </i>
            </a>

            <br />
        </div>
    );
}
