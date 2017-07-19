import 'es6-promise/auto';
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/index';
import * as BrowserUtils from './utils/BrowserUtils';
Vue.use(VueRouter);
const MOBILE_KEY = '/m';
window.BrowserUtils = BrowserUtils;
const os = window.os = BrowserUtils.os;
function beforeCreate (self) {
    const pathname = window.location.pathname;
    if (os.isMobile && pathname.indexOf(MOBILE_KEY) !== 0) { // 切换为移动版
        window.location.pathname = MOBILE_KEY + pathname;
    } else if (os.isPC && pathname.indexOf(MOBILE_KEY + '/') === 0) { // 切换为PC版
        window.location.pathname = pathname.substr(MOBILE_KEY.length);
    } else {
        BrowserUtils.setShotCutIcon();
        let targetNode = window.document.getElementsByTagName('div')[0];
        targetNode.className = 'mainLayout h100 w100 ' + targetNode.className;
        targetNode.style.cssText = 'position:relative;' + targetNode.style.cssText;
        window.onresize = () => {
            self.$store.dispatch('setBodyWidth', window.document.body.offsetWidth);
        };
    }
}
require('assets/css/common/reset.css');
module.exports = {
    store: store, router: new VueRouter({mode: 'history'}), beforeCreate: beforeCreate, Vue: Vue
};