import * as request from './requester';

const baseUrl = 'http://localhost:3030/data/dishes';

export const getAll = () => request.get(baseUrl);

export const getOne = (dishId) => request.get(`${baseUrl}/${dishId}`);

export const create = (dishData) => request.post(baseUrl, dishData);

export const edit = (dishId, dishData) => request.put(`${baseUrl}/${dishId}`, dishData);

export const remove = (dishId) => request.del(`${baseUrl}/${dishId}`);