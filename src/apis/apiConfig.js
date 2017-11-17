import axios from 'axios';
import Promise from 'es6-promise';
import Vue from 'vue';
import Keys from '../../secret/keys.json';
import Network from '../../secret/network.json';
import * as BrowserUtils from '../../utils/web/BrowserUtils';

axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    console.log('request error:', error);
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    console.log('response:', response);
    return response;
}, function (error) {
    console.log('response error:', error);
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
            console.log('status code:' + status);
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
            api.headers[Keys.request_header_token] = accessToken();
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
    },
    getNotice: (data) => {
        return api(`/api/notice/official/list`, data, GET);
    },
    getArticle: (data) => {
        return api(`/api/article/official/list`, data, GET);
    },
    getProjectMenu: (data) => {
        return api(`/api/project/menu/list`, data, GET);
    },
    getProjectListByMenu: (data) => {
        return api(`/api/project/list`, data, GET);
    },
    shortUrlEncode: (data) => {
        return api(`/s/encode`, data, GET);
    },
    shortUrlDecode: (data) => {
        return api(`/s/decode`, data, GET);
    }
};