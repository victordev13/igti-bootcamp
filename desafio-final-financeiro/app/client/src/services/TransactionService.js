import http from '../http-common';

const getByPeriod = (period) => {
    return http.get('?period=' + period);
};

const getById = (id) => {
    return http.get('/' + id);
};

const create = (data) => {
    return http.post('/', data);
};

const update = (id, data) => {
    return http.put('/' + id, data);
};

const remove = (id) => {
    return http.delete('/' + id);
};

export default { getByPeriod, getById, create, update, remove };
