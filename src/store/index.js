import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import * as types from './mutation-types';

Vue.use(Vuex);
let state = {
    bodyWidth: window.document.body.offsetWidth,
    isShowLoading: false,
    toastInfo: {toastContent: ''}
};
let mutations = {
    [types.BODY_WIDTH] (state, bodyWidth) {
        state.bodyWidth = bodyWidth;
    },
    [types.LOADING] (state, isShowLoading) {
        state.isShowLoading = isShowLoading === undefined ? !state.isShowLoading : isShowLoading;
    },
    [types.TOAST] (state, toastContent) {
        state.toastInfo = {
            toastContent: toastContent
        };
    }
};
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
});