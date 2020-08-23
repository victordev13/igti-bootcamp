import React from 'react';

export default class Bar extends React.Component {
    render() {
        const { value, color = 'black' } = this.props;

        return (
            <div
                style={{
                    marginTop: '40px',
                    width: value + '%',
                    height: '30px',
                    backgroundColor: color,
                    color: 'white',
                    fontSize: '10pt',
                }}
            >
                {value.toFixed(2)}%
            </div>
        );
    }
}
