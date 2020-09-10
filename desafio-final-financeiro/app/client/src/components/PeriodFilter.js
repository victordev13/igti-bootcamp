import React from 'react';
import css from './periodFilter.module.css';

export default function PeriodFilter({ currentMonth, filter }) {
    const months = [
        { text: 'Jan/2019', value: '1-2019' },
        { text: 'Fev/2019', value: '2-2019' },
        { text: 'Mar/2019', value: '3-2019' },
        { text: 'Abr/2019', value: '4-2019' },
        { text: 'Mai/2019', value: '5-2019' },
        { text: 'Jun/2019', value: '6-2019' },
        { text: 'Jul/2019', value: '7-2019' },
        { text: 'Ago/2019', value: '8-2019' },
        { text: 'Set/2019', value: '9-2019' },
        { text: 'Out/2019', value: '10-2019' },
        { text: 'Nov/2019', value: '11-2019' },
        { text: 'Dez/2019', value: '12-2019' },

        { text: 'Jan/2020', value: '1-2020' },
        { text: 'Fev/2020', value: '2-2020' },
        { text: 'Mar/2020', value: '3-2020' },
        { text: 'Abr/2020', value: '4-2020' },
        { text: 'Mai/2020', value: '5-2020' },
        { text: 'Jun/2020', value: '6-2020' },
        { text: 'Jul/2020', value: '7-2020' },
        { text: 'Ago/2020', value: '8-2020' },
        { text: 'Set/2020', value: '9-2020' },
        { text: 'Out/2020', value: '10-2020' },
        { text: 'Nov/2020', value: '11-2020' },
        { text: 'Dez/2020', value: '12-2020' },

        { text: 'Jan/2021', value: '1-2021' },
        { text: 'Fev/2021', value: '2-2021' },
        { text: 'Mar/2021', value: '3-2021' },
        { text: 'Abr/2021', value: '4-2021' },
        { text: 'Mai/2021', value: '5-2021' },
        { text: 'Jun/2021', value: '6-2021' },
        { text: 'Jul/2021', value: '7-2021' },
        { text: 'Ago/2021', value: '8-2021' },
        { text: 'Set/2021', value: '9-2021' },
        { text: 'Out/2021', value: '10-2021' },
        { text: 'Nov/2021', value: '11-2021' },
        { text: 'Dez/2021', value: '12-2021' },
    ];

    const handleSelectPeriod = (event) => {
        const period = event.target.value;
        filter(period);
    };

    return (
        <div className={css.flexRow}>
            <a className="waves-effect waves-light btn">
                <i className="material-icons ">chevron_left</i>
            </a>

            <select
                className="browser-default"
                onChange={handleSelectPeriod}
                value={currentMonth}
            >
                {months.map((option, index) => {
                    return (
                        <option key={index} value={option.value}>
                            {option.text}
                        </option>
                    );
                })}
            </select>
            <a className="waves-effect waves-light btn">
                <i className="material-icons">chevron_right</i>
            </a>

            <br />
        </div>
    );
}
