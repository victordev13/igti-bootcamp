import React from 'react';
import css from './databar.module.css';

export default function DataBar() {
    return (
        <div className={css.flexRow}>
            <div>Lançamentos: 12</div>
            <div>
                Receita: <span className="green-text">R$0</span>
            </div>
            <div>
                Despesas: <span className="red-text">R$0</span>
            </div>
            <div>
                Saldo: <span className="green-text">R$0</span>
            </div>
        </div>
    );
}
