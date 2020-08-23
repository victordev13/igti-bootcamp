import React, { Component } from 'react';

export default class InputFullSalary extends Component {
    handleInputChange = (event) => {
        this.props.onChange(event.target.value);
    };
    render() {
        const { value } = this.props;
        return (
            <div className="row">
                <div className="col s12">
                    <div className="input-field col s12">
                        <input
                            id="fullSalary"
                            type="number"
                            min="1000"
                            max="10000"
                            maxLength="6"
                            value={value}
                            onChange={this.handleInputChange}
                        />
                        <label labelfor="fullSalarry">Salário Bruto</label>
                    </div>
                </div>
            </div>
        );
    }
}
