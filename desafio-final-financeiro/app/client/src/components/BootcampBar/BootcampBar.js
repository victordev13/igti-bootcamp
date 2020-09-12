import React from 'react';
import css from './bootcampbar.module.css';

export default function BootcampBar({ module, title, type }) {
    return (
        <div className={css.top}>
            <img
                src="https://www.igti.com.br/wp-content/uploads/2020/02/D.-Full-Stack.png"
                alt=""
            />
            <span>
                {module} | {type} - <b>{title}</b>
            </span>
        </div>
    );
}
