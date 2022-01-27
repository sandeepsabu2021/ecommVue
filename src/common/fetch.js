import axios from 'axios';
import { DEF_URL } from '@/common/url';

export function feature(data) {
    return axios.get(`${DEF_URL}feature`, data)
}

export function recommend(data) {
    return axios.get(`${DEF_URL}recommend`, data)
}

export function banner(data) {
    return axios.get(`${DEF_URL}banner`, data)
}

export function category(data) {
    return axios.get(`${DEF_URL}category`, data)
}

export function brand(data) {
    return axios.get(`${DEF_URL}brand`, data)
}

export default { feature, recommend, category, brand }