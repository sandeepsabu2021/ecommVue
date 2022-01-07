import axios from 'axios';
import { MAIN_URL } from '@/common/url';

export function userLogin(data) {
    return axios.post(`${MAIN_URL}login`, data)
}

export function userRegister(data) {
    return axios.post(`${MAIN_URL}register`, data)
}

export function contact(data) {
    return axios.post(`${MAIN_URL}contact`, data)
}

export default { userLogin, userRegister, contact };