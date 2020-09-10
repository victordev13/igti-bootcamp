function formatter(value) {
    const formatter = Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 2,
    });
    return formatter.format(value);
}

function formatterPercent(value) {
    const formatter = Intl.NumberFormat('pt-BR', {
        style: 'percent',
        minimumFractionDigits: 2,
    });

    return formatter.format(value);
}

export { formatter, formatterPercent };
