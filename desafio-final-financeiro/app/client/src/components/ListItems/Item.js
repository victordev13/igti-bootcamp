import React from 'react';
import css from './item.module.css';

export default function Item({
    id,
    day,
    title,
    description,
    value,
    type,
    editItem,
    removeItem,
}) {
    const color = type === '+' ? 'green accent-2' : 'red lighten-3';

    const handleEditItem = () => {
        editItem(id);
    };

    const handleRemoveItem = () => {
        removeItem(id);
    };
    return (
        <div>
            <div className={`card-panel center ${color}`}>
                <div className={css.flexRow}>
                    <div className={css.flexRow}>
                        <div className={css.index}>{day}</div>
                        <div>
                            <b>{title}</b>
                            <p style={{ margin: '0' }}>{description}</p>
                        </div>
                    </div>
                    <div className={css.flexRow}>
                        <div className={css.value}>R$ {value}</div>
                        <div className={`${css.actions} ${css.flexRow}`}>
                            <i
                                className="material-icons"
                                onClick={handleEditItem}
                            >
                                create
                            </i>
                            <i
                                className="material-icons"
                                onClick={handleRemoveItem}
                            >
                                delete
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
