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
    }
};