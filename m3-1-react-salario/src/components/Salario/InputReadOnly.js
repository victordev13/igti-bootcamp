import React, { Component } from 'react';

export default class InputReadOnly extends Component {
    render() {
        const { value, inputTitle, color } = this.props;
        return (
            <div className="input-field col s3">
                <input
                    type="text"
                    readOnly
                    style={{ color: color, fontWeight: 'bolder' }}
                    value={value}
                />
                <label labelfor="email">{inputTitle}</label>
            </div>
        );
    }
}
