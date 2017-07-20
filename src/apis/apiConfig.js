import axios from 'axios';
import Promise from 'es6-promise';
import Vue from 'vue';
import Network from '../../secret/network.json';
import * as BrowserUtils from '../../utils/web/BrowserUtils';

axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    console.log(error);
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    console.log(response);
    return response;
}, function (error) {
    console.log(error);
    error.data = {
        status: -1
    };
    return Promise.reject(error);
});
axios.defaults.baseURL = BrowserUtils.isTest ? Network.host.local : Network.host.remote;
axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.prototype.$http = axios;

function api (url, data, method, headers) {
    method = method || GET;
    data = data || {};
    let params = {
        method: method,
        url: url,
        headers: headers || {},
        timeout: 60000,
        validateStatus: (status) => {
            console.log(status);
            return true;
        }
    };
    if (method === GET) {
        params.params = data;
    } else {
        params.data = data;
    }
    return params;
}

function accessToken () {
    return 'test';
}

const GET = 'get';
const POST = 'post';
const PUT = 'put';
const DELETE = 'delete';
/**
 * @param api 请求封装
 * @param hasAccessToken 是否追加AccessToken
 * @param specialHeaders 是否追加特殊的Header
 * */
module.exports = {
    request: (api, hasAccessToken, specialHeaders) => {
        api.headers = api.headers || {};
        if (hasAccessToken) {
            api.headers['C-O-Token'] = accessToken();
        }
        if (specialHeaders) {
            for (let key in specialHeaders) {
                api.headers[key] = specialHeaders[key];
            }
        }
        return axios.request(api).then((res) => {
            return Promise.resolve(res.data);
        }).catch((err) => {
            return Promise.resolve(err);
        });
    },
    signIn: (data) => {
        return api(`/api/users/account`, data, POST);
    }
};