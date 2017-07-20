let storage = window.localStorage;
if (!storage) {
    console.error('不支持localStorage');
}

function time (offset) {
    return new Date().getTime() + (offset || 0);
}

module.exports = {
    /**
     * @param expire 某一时刻过期，时间戳，单位：秒 new Date().getTime()
     * */
    set: (key, value, expire) => {
        storage.setItem(key, JSON.stringify({
            data: value,
            expire: expire || (time(86400000)) // 默认为一天
        }));
    },
    /**
     * @param igExpire 是否忽略时效 boolean
     * */
    get: (key, igExpire) => {
        let value = JSON.parse(storage.getItem(key));
        if (value) {
            let data = value.data;
            if (igExpire) { // 如果忽略时效
                return data;
            } else if (time() < value.expire) {
                return data;
            } else {
                storage.removeItem(key);
                return null;
            }
        }
        return value;
    },
    remove: (key) => {
        return storage.removeItem(key);
    },
    clear: () => {
        storage.clear();
    },
    length: () => {
        return storage.length;
    }
};