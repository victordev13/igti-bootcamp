//DOM Elements
let inputUser = null;
let btnInput = null;
let textTabUsersList = null;
let textTabStatistics = null;

let tabUsersList = null;
let tabSatistics = null;
let preloader = null;
let pageItens = null;

//Users Statistics
let allUsers = [];
let filteredUsers = [];
let countMan = null;
let countWoman = null;
let sumAge = null;
let averageAge = null;

window.addEventListener('load', start);

function start() {
    inputUser = document.querySelector('#inputUser');
    btnSearch = document.querySelector('#btnSearch');
    tabUsersList = document.querySelector('#tabUsersList');
    tabStatistics = document.querySelector('#tabStatistics');
    pageItens = document.querySelector('#page');
    preloader = document.querySelector('#preloader');
    textTabUsersList = document.querySelector('#textTabUsersList');
    textTabStatistics = document.querySelector('#textTabStatistics');

    inputUser.addEventListener('keyup', handleTypingInputValidate);
    document
        .querySelector('form')
        .addEventListener('submit', preventFormSubmit);

    numberFormat = Intl.NumberFormat('pt-BR', { maximumSignificantDigits: 4 });

    fetchUsersList();
}

function preventFormSubmit(event) {
    event.preventDefault();
    if (inputUser.value.length >= 1) {
        filter(inputUser.value);
    }
}

function handleTypingInputValidate(event) {
    let hasText = !!event.target.value && event.target.value.trim() !== '';

    if (!hasText) {
        inputUser.value = '';
        btnSearch.disabled = true;
        return;
    }

    btnSearch.disabled = false;
}

async function fetchUsersList() {
    showLoading();
    const res = await fetch(
        //'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
        'http://localhost:3000/results'
    );
    const json = await res.json();

    //allUsers = json.results.map((user) => {
    allUsers = json.map((user) => {
        const { picture, gender, dob, name } = user;
        return {
            profilePic: picture.thumbnail,
            gender: gender,
            age: dob.age,
            fullName: name.first + ' ' + name.last,
        };
    });
    console.log('Dados API: ');
    console.log(allUsers);
    hideLoading();
    render();
}

function filter(value) {
    const searchParam = value.toLowerCase();
    filteredUsers = allUsers.filter((user) =>
        user.fullName.toLowerCase().includes(searchParam)
    );
    generateStatistics();
    render();
}

function generateStatistics() {
    countMan = filteredUsers.filter((user) => user.gender === 'male');
    countMan = countMan.length;
    countWoman = filteredUsers.filter((user) => user.gender === 'female');
    countWoman = countWoman.length;
    sumAge = filteredUsers.reduce((accumulator, current) => {
        return accumulator + current.age;
    }, 0);
    averageAge = numberFormat.format(sumAge / filteredUsers.length);
}

function render() {
    renderUsersList();
    renderStatistics();
}

function renderUsersList() {
    tabUsersList.innerHTML = '';

    if (filteredUsers.length) {
        let usersListHTML = '<div>';
        filteredUsers.forEach((user) => {
            const singleUserHTML = `<div class='single-user'>
            <div><img src='${user.profilePic}'></div>
                <div>${user.fullName}, ${user.age} anos</div>
            </div>`;
            usersListHTML += singleUserHTML;
        });
        usersListHTML += '</div>';
        tabUsersList.innerHTML =
            `<h4>${filteredUsers.length}</b> usuário(s) encontrado(s)</h4>` +
            usersListHTML;
    } else {
        tabUsersList.innerHTML = `<h4>Nenhum usuário Filtrado</h4>`;
    }
}

function renderStatistics() {
    tabStatistics.innerHTML = '';

    if (filteredUsers.length) {
        tabStatistics.innerHTML = `<h4>Estatísticas</h4>
        <p>Sexo Masculino: <b>${countMan}</b></p> 
        <p>Sexo Feminino: <b>${countWoman}</b></p>
        <p>Soma das idades: <b>${sumAge}</b></p>
        <p>Média das idades: <b>${averageAge}</b></p>`;
    } else {
        tabStatistics.innerHTML = '<h4>Nada a ser exibido</h4>';
    }
}

function showLoading() {
    pageItens.classList.add('hide');
    inputUser.disabled = true;
    preloader.classList.remove('hide');
    preloader.classList.add('show');
}

function hideLoading() {
    setTimeout(() => {
        pageItens.classList.remove('hide');
        pageItens.classList.add('show');
        inputUser.disabled = false;

        preloader.classList.remove('show');
        preloader.classList.add('hide');
    }, 1000);
}
