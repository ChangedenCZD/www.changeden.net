// import api from '../api/index';
import * as types from './mutation-types';

export const setBodyWidth = ({commit}, val) => {
    commit(types.BODY_WIDTH, val);
};
export const toggleLoading = ({commit}, val) => {
    commit(types.LOADING, val);
};
export const showToast = ({commit}, val) => {
    commit(types.TOAST, val);
};
export const setBodyMinHeight = ({commit}, val) => {
    commit(types.BODY_MIN_HEIGHT, val);
};