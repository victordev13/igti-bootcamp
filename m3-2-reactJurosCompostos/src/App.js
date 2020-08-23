import React from 'react';
import BootcampBar from './components/BootcampBar/BootcampBar';
import Form from './components/form/Form';
import Installments from './components/Installments/Installments';
import Installment from './components/Installments/Installment';
import { compoundInterest } from './helpers/CompoundInterest';

export default function App() {
    const title = 'React Juros Compostos';
    document.title = title;

    const redColorClass = 'red-text';
    const greenColorClass = 'green-text';
    let color = '';

    const [capital, setCapital] = React.useState('');
    const [juros, setJuros] = React.useState(0);
    const [months, setMonths] = React.useState('');
    const [installments, setInstallments] = React.useState([]);

    React.useEffect(() => {
        setCapital(capital);
    }, [capital]);

    React.useEffect(() => {
        setJuros(juros);
    }, [juros]);

    React.useEffect(() => {
        setMonths(months);
    }, [months]);

    React.useEffect(() => {
        if (months >= 1 && capital > 0 && capital !== '') {
            setInstallments(compoundInterest(capital, juros, months));
        }
    }, [capital, juros, months]);

    const handleMonth = (value) => {
        setMonths(value > 1200 ? 0 : value);
    };

    const handleCapital = (value) => {
        setCapital(value);
    };

    const handleJuros = (value) => {
        setJuros(value);
    };

    juros < 0 ? (color = redColorClass) : (color = greenColorClass);

    return (
        <div>
            <BootcampBar module="Módulo 03" title={title} type="Desafio 02" />
            <div className="container">
                <Form
                    onChangeCapital={handleCapital}
                    onChangeJuros={handleJuros}
                    onChangeMonth={handleMonth}
                />

                <Installments>
                    {installments.map((item, index) => (
                        <Installment
                            key={item.mes}
                            id={item.mes}
                            value={item.valorMensal}
                            juros={item.valorMensalMaisJuros}
                            percentage={item.valorJuroMensal}
                            color={color}
                        ></Installment>
                    ))}
                </Installments>
            </div>
        </div>
    );
}
