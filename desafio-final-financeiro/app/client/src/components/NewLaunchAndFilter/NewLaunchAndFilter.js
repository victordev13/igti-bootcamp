import React from 'react';
import NewLaunchButton from './NewLaunchButton';
import css from './newLaunchAndFilter.module.css';
import InputFilter from './InputFilter';

export default function NewLaunchAndFilter() {
    return (
        <div className={css.flexRow}>
            <NewLaunchButton disabled={true} />
            <InputFilter />
        </div>
    );
}
