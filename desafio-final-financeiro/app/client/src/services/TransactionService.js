import http from '../http-common';

const getPeriod = (period) => {
    return http.get('?period=' + period);
};

export default { getPeriod };
