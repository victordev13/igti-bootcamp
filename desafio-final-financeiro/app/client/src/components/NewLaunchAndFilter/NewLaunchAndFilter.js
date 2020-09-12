import React from 'react';
import css from './newLaunchAndFilter.module.css';

export default function NewLaunchAndFilter({ newTransaction }) {
    const handleNewTransaction = () => {
        newTransaction();
    };
    return (
        <div className="row">
            <div className={`${css.flexRow}`}>
                <div className="input-field col s4">
                    <a
                        className="waves-effect waves-light btn"
                        style={{ position: 'initial' }}
                        onClick={handleNewTransaction}
                    >
                        <i className="material-icons left">add</i>NOVO
                        LANÇAMENTO
                    </a>
                </div>
                <div className="input-field col s8">
                    <input type="text" />
                </div>
            </div>
        </div>
    );
}
