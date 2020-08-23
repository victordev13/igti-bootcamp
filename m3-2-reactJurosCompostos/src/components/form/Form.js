import React from 'react';

export default function Form({
    onChangeMonth,
    onChangeJuros,
    onChangeCapital,
}) {
    const [capital, setCapital] = React.useState('');
    const [juros, setJuros] = React.useState('');
    const [month, setMonth] = React.useState('');

    React.useEffect(() => {
        onChangeMonth(month);
    }, [month]);

    React.useEffect(() => {
        onChangeJuros(juros);
    }, [juros]);

    React.useEffect(() => {
        onChangeCapital(capital);
    }, [capital]);

    return (
        <div className="row">
            <div className="input-field col s4">
                <input
                    id="capital"
                    type="number"
                    min="100"
                    max=""
                    value={capital}
                    onChange={({ target }) => setCapital(target.value)}
                />
                <label htmlFor="capital" className="active">
                    Capital Inicial:
                </label>
            </div>

            <div className="input-field col s4">
                <input
                    id="juros"
                    type="number"
                    min="-12"
                    max="12"
                    step="0.1"
                    value={juros}
                    onChange={({ target }) => setJuros(target.value)}
                />
                <label htmlFor="juros" className="active">
                    Taxa de Juros mensal:
                </label>
            </div>

            <div className="input-field col s4">
                <input
                    id="periodo"
                    type="number"
                    min="0"
                    value={month}
                    onChange={({ target }) => setMonth(target.value)}
                />
                <label htmlFor="periodo" className="active">
                    Período (meses):
                </label>
            </div>
        </div>
    );
}
