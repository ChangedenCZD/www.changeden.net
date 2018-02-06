import * as ApiConfig from './apiConfig';

module.exports = {
    signIn: (account, password) => {
        let t = async () => {
            let params = {
                account: account,
                password: password
            };
            return await ApiConfig.request(ApiConfig.signIn(params), false, null);
        };
        return t();
    },
    getOfficialNotice: (size) => {
        return (async () => {
            let params = {
                size: size
            };
            return await ApiConfig.request(ApiConfig.getNotice(params), false, null);
        })();
    },
    getOfficialArticle: (size) => {
        return (async () => {
            let params = {
                size: size
            };
            return await ApiConfig.request(ApiConfig.getArticle(params), false, null);
        })();
    },
    getProjectMenu: (size) => {
        return (async () => {
            let params = {
                size: size
            };
            return await ApiConfig.request(ApiConfig.getProjectMenu(params), false, null);
        })();
    },
    getProjectListByMenu: (menuId) => {
        return (async () => {
            let params = {
                menuId: menuId
            };
            return await ApiConfig.request(ApiConfig.getProjectListByMenu(params), false, null);
        })();
    },
    shortUrlEncode: (url) => {
        return (async () => {
            let params = {
                url: url
            };
            return await ApiConfig.request(ApiConfig.shortUrlEncode(params), false, null);
        })();
    },
    shortUrlDecode: (url) => {
        return (async () => {
            let params = {
                url: url
            };
            return await ApiConfig.request(ApiConfig.shortUrlDecode(params), false, null);
        })();
    },
    statisticsUrl: () => {
        return (async () => {
            let params = {
                url: window.location.href
            };
            return await ApiConfig.request(ApiConfig.statisticsUrl(params), false, null);
        })();
    }
};