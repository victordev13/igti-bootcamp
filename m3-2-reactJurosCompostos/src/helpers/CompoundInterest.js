import { formatter, formatterPercent } from './format';

function compoundInterest(montanteInicial, taxaJuros, periodoMeses) {
    const montanteMensal = [
        {
            mes: 0,
            valorMensal: 0,
            valorMensalMaisJuros: 0,
            valorJuroMensal: 0,
        },
    ];
    for (let i = 1; i <= periodoMeses; i++) {
        const montanteMaisJuros = montanteInicial * (1 + taxaJuros / 100) ** i;
        const montanteJuroMensal = montanteMaisJuros - montanteInicial;
        montanteMensal[i - 1] = {
            mes: i,
            valorMensal: formatter(montanteMaisJuros),
            valorMensalMaisJuros:
                montanteJuroMensal > 0
                    ? '+' + formatter(montanteJuroMensal)
                    : formatter(montanteJuroMensal),
            valorJuroMensal: formatterPercent(
                montanteJuroMensal / montanteInicial
            ),
        };
    }
    return montanteMensal;
}

export { compoundInterest };
