import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import * as types from './mutation-types';
Vue.use(Vuex);
let state = {
    recommendProducts: [],
    // 秒杀商品类型
    classModel: '',
    // 选取的普通商品规格相关信息
    skuSelect: {},
    // 选取的旅游商品规格相关信息
    skuSelectLv: {
        adult: '',
        kid: ''
    },
    // 地址信息
    addressInfo: {
        provice: '',
        city: '',
        area: '',
        detail: '',
        name: '',
        tel: ''
    },
    // 规格框显示/隐藏
    skuShow: false,
    // 单独地址页显示/隐藏
    signalAddressPage: false,
    // 订单页显示/隐藏
    orderPage: false,
    // 担保交易显示/隐藏
    dealPageShow: false,
    // 是否有非担保交易
    isUnsecured: false,
    // 发票信息页显示/隐藏
    billPageShow: false,
    // 出行人信息填写页
    trInfoPage: false,
    // 旅游保险页
    // 发票、担保信息
    dealInfo: {
        isInvoice: 0,
        invoiceTitle: '',
        invoiceType: 0,
        isAssure: 1
    },
    // loading显示/隐藏
    loadingTab: false,
    // 弹窗提示
    warnInfo: {
        flag: false,
        content: ''
    },
    // 旅游填写信息点击标志
    clickInfo: {
        type: '',
        index: ''
    },
    // 出行人
    people: {
        adult: '',
        kid: ''
    },
    // 地址跳转返回前一项，标记的是项目间的跳转不是页面的跳转
    addressJump: null,
    // 微信下openId
    openId: null,
    // 非担保交易下的支付方式
    unSecureway: {
        wx: true,
        bao: true,
        canPay: true
    },
    // 号码选择显示/隐藏
    phoneSelectorShow: false,
    // 已选号码
    selectedPhone: null,
    // 商品额外参数
    productParams: null,
    // 显示电信协议
    dianxinAgreementShow: false,
    // 身份证资料
    idCardInfoShow: false,
    // 银行卡资料
    bankCardInfoShow: false,
    // 电信商品下单拓展参数
    settleExtra: {},
    // 计时器ID集合
    timeoutId: null,
    // 订单中心登录界面显示/隐藏
    orderManagerLoginLayoutShow: false,
    // 订单中心查询者信息
    orderManagerBuyerInfo: null,
    // document中的标题
    mainTitle: '爽快云销',
    // 显示隐藏客服列表
    staffListShow: false,
    // 用户设置显示/隐藏
    userSettingShow: false,
    // APP移植的各版本配置
    appConfig: {},
    // 底部选择器所选项
    bottomSelectedOption: {},
    // 底部选择器显示/隐藏
    isBottomSelectorShow: {},
    // 是否可填写客户自定义信息
    isNeedCustomParamValues: false,
    // 客户自定义信息
    customParamValues: null
};
let mutations = {
    [types.GET_PRODUCT_RECOMMEND_LIST] (state, recommendProducts) {
        state.recommendProducts = recommendProducts;
    },
    [types.SECK_LIST] (state, val) {
        state.secList = val;
        console.log(state.secList);
    },
    [types.CLASS_MODEL] (state, val) {
        state.classModel = val;
        console.log('商品类型---' + val);
    },
    [types.SKU_SELECT] (state, val) {
        state.skuSelect = val;
        console.log('得到普通产品选取规格');
    },
    [types.SKU_SELECE_LV] (state, val) {
        state.skuSelectLv = val;
        console.log('得到旅游产品选取规格信息');
        console.log(val);
    },
    [types.SKU_SHOWTAB] (state) {
        state.skuShow = !state.skuShow;
        console.log('规格tab', state.skuShow);
    },
    [types.ADDRESS_INFO] (state, val) {
        state.addressInfo = val;
        state.signalAddressPage = !state.signalAddressPage;
        state.orderPage = !state.orderPage;
        console.log(val);
    },
    [types.SINGELADDRESS_PAGE_SHOW] (state, val) {
        state.signalAddressPage = !state.signalAddressPage;
        state.addressJump = val;
    },
    [types.PAGE_JUMP] (state) {
        state.signalAddressPage = !state.signalAddressPage;
        if (state.addressJump === 1) {
            state.orderPage = !state.orderPage;
        }
    },
    [types.DEAL_PAGE_SHOW] (state) {
        state.dealPageShow = !state.dealPageShow;
    },
    [types.JUG_ISUNSECURED] (state, val) {
        if (val === 1) {
            state.isUnsecured = true;
            console.log('存在非担保交易');
        } else {
            state.isUnsecured = false;
            console.log('不存在非担保交易');
        }
    },
    [types.BILL_PAGE_SHOW] (state) {
        state.billPageShow = !state.billPageShow;
    },
    [types.DEAL_INFO] (state, val) {
        state.dealInfo = val;
        console.log(state.dealInfo);
    },
    [types.LOADING_TAB] (state) {
        console.log('loading...');
        state.loadingTab = !state.loadingTab;
        if (state.loadingTab) {
            if (state.timeoutId) {
                clearTimeout(state.timeoutId);
            }
            state.timeoutId = setTimeout(function () {
                state.loadingTab = false;
            }, 60000);
        }
    },
    [types.WARN_SHOW] (state, info) {
        console.log('警告窗弹出');
        let warnInfo = JSON.parse(JSON.stringify(state.warnInfo));
        warnInfo.flag = !state.warnInfo.flag;
        warnInfo.content = info;
        state.warnInfo = warnInfo;
        setTimeout(function () {
            state.warnInfo.flag = !state.warnInfo.flag;
        }, 1000);
    },
    [types.ORDER_PAGE_SHOW] (state) {
        state.orderPage = !state.orderPage;
        console.log(state.orderPage ? '订单页显示' : '订单页隐藏');
    },
    [types.TRINFO_PAGE_SHOW] (state) {
        state.trInfoPage = !state.trInfoPage;
        console.log(state.trInfoPage ? '旅游出行人信息填写页显示' : '旅游出行人信息填写页隐藏');
    },
    [types.CLICK_INFO] (state, val) {
        state.clickInfo = val;
        console.log('点击标志', val);
    },
    [types.PEOPLE] (state, val) {
        state.people = val;
        console.log(state.people);
    },
    [types.OPENID] (state, val) {
        state.openId = val;
        console.log(state.people);
    },
    [types.UNSECUREWAY] (state, val) {
        state.unSecureway = val;
    },
    [types.SKU_SELECT_PHONE] (state) {
        state.phoneSelectorShow = !state.phoneSelectorShow;
        console.log('号码选择器', state.phoneSelectorShow);
    },
    [types.PHONE_SELECTED] (state, val) {
        state.selectedPhone = val;
        console.log('已选号码', state.selectedPhone);
    },
    [types.PRODUCT_PARAMS] (state, val) {
        state.productParams = val;
        console.log('商品参数', state.productParams);
    },
    [types.DIAN_XIN_AGREEMENT] (state) {
        state.dianxinAgreementShow = !state.dianxinAgreementShow;
        console.log('显示电信协议', state.dianxinAgreementShow);
    },
    [types.ID_CARD_INFO] (state) {
        state.idCardInfoShow = !state.idCardInfoShow;
        console.log('显示身份证资料', state.idCardInfoShow);
    },
    [types.BANK_CARD_INFO] (state) {
        state.bankCardInfoShow = !state.bankCardInfoShow;
        console.log('显示银行卡资料', state.bankCardInfoShow);
    },
    [types.SETTLE_EXTRA] (state, val) {
        state.settleExtra = val;
        console.log('设置电信商品下单拓展参数', state.settleExtra);
    },
    [types.ORDER_MANAGER_LOGIN] (state) {
        state.orderManagerLoginLayoutShow = !state.orderManagerLoginLayoutShow;
        console.log('显示订单中心登录界面', state.orderManagerLoginLayoutShow);
    },
    [types.ORDER_MANAGER_BUYER] (state, val) {
        state.orderManagerBuyerInfo = val;
        console.log('设置订单中心查询者信息', state.orderManagerBuyerInfo);
    },
    [types.MAIN_TITLE] (state, val) {
        state.mainTitle = val;
        console.log('设置Document中的标题', state.mainTitle);
    },
    [types.STAFF_LIST] (state) {
        state.staffListShow = !state.staffListShow;
        console.log('显示客服列表', state.staffListShow);
    },
    [types.USER_SETTING] (state) {
        state.userSettingShow = !state.userSettingShow;
        console.log('显示用户设置', state.userSettingShow);
    },
    [types.APP_CONFIG] (state, val) {
        state.appConfig = val || {};
        console.log('App配置', state.appConfig);
    },
    [types.BOTTOM_SELECTOR] (state, target) {
        state.isBottomSelectorShow[target] = !state.isBottomSelectorShow[target];
        state.isBottomSelectorShow = JSON.parse(JSON.stringify(state.isBottomSelectorShow));
        console.log('显示底部选择器', state.isBottomSelectorShow[target]);
    },
    [types.BOTTOM_SELECTOR_OPTION] (state, val) {
        let selected = state.bottomSelectedOption;
        val = val || {};
        selected[val.target || new Date().getTime()] = val;
        state.bottomSelectedOption = JSON.parse(JSON.stringify(selected));
        console.log('设置底部选择器所选项', state.bottomSelectedOption);
    },
    [types.NEED_CUSTOM_PARAM_VALUES] (state, val) {
        state.isNeedCustomParamValues = val;
        console.log('需要填写自定义信息', state.isNeedCustomParamValues);
    },
    [types.CUSTOM_PARAM_VALUES] (state, val) {
        state.customParamValues = val;
        console.log('设置自定义信息', state.customParamValues);
    }
};
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
});