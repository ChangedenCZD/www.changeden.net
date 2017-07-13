// import api from '../api/index';
import * as types from './mutation-types';

export const loadingTab = ({commit}) => {
    commit(types.LOADING_TAB);
};

export const warnTab = ({commit}, info) => {
    commit(types.WARN_SHOW, info);
};

export const secList = ({commit}, val) => {
    commit(types.SECK_LIST, val);
};

export const getClassModel = ({commit}, val) => {
    commit(types.CLASS_MODEL, val);
};

export const skuTab = ({commit}) => {
    commit(types.SKU_SHOWTAB);
};

export const getSkuSelect = ({commit}, val) => {
    commit(types.SKU_SELECT, val);
};

export const getSkuSelectLv = ({commit}, val) => {
    commit(types.SKU_SELECE_LV, val);
};

export const getAddressInfo = ({commit}, val) => {
    commit(types.ADDRESS_INFO, val);
};

export const toAddressPage = ({commit}, val) => {
    commit(types.SINGELADDRESS_PAGE_SHOW, val);
};

export const toOrderPage = ({commit}) => {
    commit(types.ORDER_PAGE_SHOW);
};

export const dealPageTab = ({commit}) => {
    commit(types.DEAL_PAGE_SHOW);
};

export const getIsUnsecured = ({commit}, val) => {
    commit(types.JUG_ISUNSECURED, val);
};

export const billPageTab = ({commit}) => {
    commit(types.BILL_PAGE_SHOW);
};

export const getDealInfo = ({commit}, val) => {
    commit(types.DEAL_INFO, val);
};

export const trInfoPageTab = ({commit}, val) => {
    commit(types.TRINFO_PAGE_SHOW);
};

export const getClickInfo = ({commit}, val) => {
    commit(types.CLICK_INFO, val);
};

export const getPeople = ({commit}, val) => {
    commit(types.PEOPLE, val);
};

export const backPreItem = ({commit}) => {
    commit(types.PAGE_JUMP);
};

export const getOpenId = ({commit}, val) => {
    commit(types.OPENID, val);
};

export const getUnsecureWay = ({commit}, val) => {
    commit(types.UNSECUREWAY, val);
};

export const showPhoneSelector = ({commit}) => {
    commit(types.SKU_SELECT_PHONE);
};

export const phoneSelected = ({commit}, val) => {
    commit(types.PHONE_SELECTED, val);
};

export const productParams = ({commit}, val) => {
    commit(types.PRODUCT_PARAMS, val);
};

export const showDianxinAgreement = ({commit}) => {
    commit(types.DIAN_XIN_AGREEMENT);
};

export const showIdCardInfo = ({commit}) => {
    commit(types.ID_CARD_INFO);
};

export const showBankCardInfo = ({commit}) => {
    commit(types.BANK_CARD_INFO);
};

export const setSettleExtra = ({commit}, val) => {
    commit(types.SETTLE_EXTRA, val);
};

export const showOrderManagerLogin = ({commit}) => {
    commit(types.ORDER_MANAGER_LOGIN);
};

export const setOrderManagerUserInfo = ({commit}, val) => {
    commit(types.ORDER_MANAGER_BUYER, val);
};

export const setTitle = ({commit}, val) => {
    commit(types.MAIN_TITLE, val);
};

export const showStaffList = ({commit}) => {
    commit(types.STAFF_LIST);
};

export const showUserSetting = ({commit}) => {
    commit(types.USER_SETTING);
};

export const setAppConfig = ({commit}, val) => {
    commit(types.APP_CONFIG, val);
};

export const showBottomSelector = ({commit}, target) => {
    commit(types.BOTTOM_SELECTOR, target);
};

export const setBottomOptionSelected = ({commit}, val) => {
    commit(types.BOTTOM_SELECTOR_OPTION, val);
};

export const setIsNeedCustomParamValues = ({commit}, val) => {
    commit(types.NEED_CUSTOM_PARAM_VALUES, val);
};

export const setCustomParamValues = ({commit}, val) => {
    commit(types.CUSTOM_PARAM_VALUES, val);
};
