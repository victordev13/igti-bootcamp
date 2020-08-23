import React, { Component } from 'react';
import InputFullSalary from './components/Salario/InputFullSalary';
import InputReadOnly from './components/Salario/InputReadOnly';
import ProgressBarSalary from './components/Salario/ProgressBarSalary';

import salary from './helpers/salary';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            fullSalary: 0,
        };
    }

    handleInputChange = (salaryValue) => {
        salaryValue >= 1000 && salaryValue <= 1000000
            ? this.setState({ fullSalary: salaryValue })
            : this.setState({ fullSalary: 0 });
    };

    formatNumber = (value) => {
        const { format } = new Intl.NumberFormat('pt-BR');
        return `R$ ${format(parseFloat(value).toFixed(2))}`;
    };

    formatWithPercent = (value, valorBase) => {
        const { format } = new Intl.NumberFormat('pt-BR');
        const percent = (parseFloat(value) * 100) / parseFloat(valorBase) || 0;

        return `R$ ${format(value.toFixed(2))} (${percent.toFixed(2)}%)`;
    };

    render() {
        const {
            baseINSS,
            discountINSS,
            baseIRPF,
            discountIRPF,
            netSalary,
        } = salary.calculateSalaryFrom(this.state.fullSalary);

        const { fullSalary } = this.state;

        const formatedBaseINSS = this.formatNumber(baseINSS);
        const formatedDiscountINSS = this.formatWithPercent(
            discountINSS,
            fullSalary
        );
        const formatedBaseIRPF = this.formatNumber(baseIRPF);
        const formatedDiscountIRPF = this.formatWithPercent(
            discountIRPF,
            fullSalary
        );
        const formatedNetSalary = this.formatWithPercent(netSalary, fullSalary);

        return (
            <div className="container">
                <h1 className="center-align">React Salário</h1>
                <InputFullSalary onChange={this.handleInputChange} />

                <div className="row">
                    <div className="col s12">
                        <InputReadOnly
                            inputTitle="Base INSS:"
                            value={formatedBaseINSS}
                            color=""
                        />
                        <InputReadOnly
                            inputTitle="Desconto INSS:"
                            value={formatedDiscountINSS}
                            color="#e67e22"
                        />
                        <InputReadOnly
                            inputTitle="Base IRPF:"
                            value={formatedBaseIRPF}
                            color=""
                        />
                        <InputReadOnly
                            inputTitle="Desconto IRPF:"
                            value={formatedDiscountIRPF}
                            color="#c0392b"
                        />
                        <InputReadOnly
                            inputTitle="Salário Líquido"
                            value={formatedNetSalary}
                            color="#16a085"
                        />
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ProgressBarSalary
                        value={
                            (parseFloat(discountINSS) /
                                parseFloat(fullSalary)) *
                                100 || 0
                        }
                        color="#e67e22"
                    />

                    <ProgressBarSalary
                        value={
                            (parseFloat(discountIRPF) /
                                parseFloat(fullSalary)) *
                                100 || 0
                        }
                        color="#c0392b"
                    />

                    <ProgressBarSalary
                        value={
                            (parseFloat(netSalary) / parseFloat(fullSalary)) *
                                100 || 0
                        }
                        color="#16a085"
                    />
                </div>
            </div>
        );
    }
}
