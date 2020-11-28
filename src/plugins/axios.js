import Vue from 'vue';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.covid19api.com',
    headers: {
        'Content-Type': 'application/json',
        charset: 'UTF-8'
    }
});

Vue.prototype.$api = api;

export {
    api
};