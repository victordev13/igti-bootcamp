import React from 'react';
import css from './installment.module.css';

export default function Installment({ id, value, juros, percentage, color }) {
    return (
        <div className={`${css.flexRow} ${css.item}`}>
            <div className={css.index}>{id}</div>
            <div className={`${css.info} ${color}`}>
                <span>{value}</span>
                <span>{juros}</span>
                <span style={{ fontWeight: 'lighter' }}>{percentage}</span>
            </div>
        </div>
    );
}
