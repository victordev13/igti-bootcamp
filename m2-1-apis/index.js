import { promises as fs } from 'fs';

const AllufCities = [];
let qtdCities = [];
let cidadesMaiorNomeEstados = [];
let cidadesMenorNomeEstados = [];

createCytiesJSON();
ufMoreCities();
ufLessCities();
cidadesMaiorNome().then(cidadesMaiorNomeEntreEstados);
cidadesMenorNome().then(cidadesMenorNomeEntreEstados);
readUFJson('DF').then((d) => {
    console.log('2. Arquivo DF.json lido');
});

async function createCytiesJSON() {
    try {
        const citiesData = JSON.parse(await fs.readFile('Cidades.json'));
        const ufData = JSON.parse(await fs.readFile('Estados.json'));

        //Criando arquivos JSON
        ufData.forEach(async (uf) => {
            const ufCities = citiesData
                .filter((city) => city.Estado === uf.ID)
                .map((item) => item.Nome);
            AllufCities.push({
                Uf: uf.Sigla,
                Cidades: ufCities,
            });
            await fs.writeFile(
                `./Estados/${uf.Sigla}.json`,
                JSON.stringify(ufCities)
            );
        });
        await fs.writeFile('Dados.json', JSON.stringify(AllufCities));
        console.log('1. Arquivos JSON Criados');
    } catch (error) {
        console.log('Erro: ' + error);
    }
}

async function readUFJson(uf) {
    return JSON.parse(await fs.readFile(`./Estados/${uf}.json`));
}
async function ufMoreCities() {
    try {
        const topFiveMoreCities = [];

        const allData = JSON.parse(await fs.readFile('Dados.json'));

        allData.forEach(async (uf) => {
            qtdCities.push({ UF: uf.Uf, Quantidade: uf.Cidades.length });
        });
        const qtdDecrescente = qtdCities.sort(
            (a, b) => b.Quantidade - a.Quantidade
        );
        for (let i = 0; i < 5; i++) {
            topFiveMoreCities.push(
                `${qtdDecrescente[i].UF} - ${qtdDecrescente[i].Quantidade}`
            );
        }
        console.log('\n3. >>> 5 Estados com mais cidades');
        console.log(topFiveMoreCities);
    } catch (error) {
        console.log(error);
    }
}

async function ufLessCities() {
    try {
        const topFiveLessCities = [];

        const allData = JSON.parse(await fs.readFile('Dados.json'));
        qtdCities = [];

        allData.forEach(async (uf) => {
            qtdCities.push({ UF: uf.Uf, Quantidade: uf.Cidades.length });
        });
        const qtdCrescente = qtdCities.sort(
            (a, b) => a.Quantidade - b.Quantidade
        );
        for (let i = 0; i < 5; i++) {
            topFiveLessCities.push(
                `${qtdCrescente[i].UF} - ${qtdCrescente[i].Quantidade}`
            );
        }
        console.log('\n4. >>> 5 Estados com menos cidades');
        console.log(topFiveLessCities);
    } catch (error) {
        console.log(error);
    }
}

async function cidadesMaiorNome() {
    try {
        let lengthMaiorNome = 0;
        let maiorNome = null;
        const allData = JSON.parse(await fs.readFile('Dados.json'));
        qtdCities = [];

        allData.forEach(async (uf) => {
            qtdCities.push({ UF: uf.Uf, Cidades: uf.Cidades });
        });
        console.log('\n5. >>>Cidades de Maior Nome');

        qtdCities.forEach((uf) => {
            for (let i = 0; i < uf.Cidades.length; i++) {
                if (uf.Cidades[i].length > lengthMaiorNome) {
                    maiorNome = { cidade: uf.Cidades[i], uf: uf.UF };
                    lengthMaiorNome = uf.Cidades[i].length;
                }
            }
            cidadesMaiorNomeEstados.push(maiorNome);
            console.log(maiorNome.cidade + '-' + maiorNome.uf);
            maiorNome = '';
            lengthMaiorNome = 0;
        });
    } catch (error) {
        console.log(error);
    }
}

async function cidadesMenorNome() {
    try {
        let lengthMenorNome = 9999;
        let menorNome = null;
        const allData = JSON.parse(await fs.readFile('Dados.json'));
        qtdCities = [];

        allData.forEach(async (uf) => {
            qtdCities.push({ UF: uf.Uf, Cidades: uf.Cidades });
        });

        console.log('\n6. >>> Cidades de Menor Nome');
        qtdCities.forEach((uf) => {
            for (let i = 0; i < uf.Cidades.length; i++) {
                if (
                    uf.Cidades[i].length < lengthMenorNome &&
                    uf.Cidades[i].length > 1
                ) {
                    menorNome = { cidade: uf.Cidades[i], uf: uf.UF };
                    lengthMenorNome = uf.Cidades[i].length;
                }
            }
            cidadesMenorNomeEstados.push(menorNome);
            console.log(menorNome.cidade + ' - ' + menorNome.uf);

            menorNome = '';
            lengthMenorNome = 9999;
        });
        console.log(cidadesMenorNomeEstados);
    } catch (error) {
        console.log(error);
    }
}
async function cidadesMaiorNomeEntreEstados() {
    try {
        console.log('\n7. >>> Cidades de maior Nome Entre estados');
        cidadesMaiorNomeEstados.sort((a, b) => {
            return b.cidade.length - a.cidade.length;
        });

        console.log(cidadesMaiorNomeEstados[0]);
    } catch (error) {
        console.log(error);
    }
}
async function cidadesMenorNomeEntreEstados() {
    try {
        console.log('\n8. >>> Cidades de menor Nome Entre estados');
        cidadesMenorNomeEstados.sort((a, b) => {
            return a.cidade.length - b.cidade.length;
        });
        cidadesMenorNomeEstados.sort();

        console.log(cidadesMenorNomeEstados);
    } catch (error) {
        console.log(error);
    }
}
