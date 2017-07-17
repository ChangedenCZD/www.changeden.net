// import api from '../api/index';
import * as types from './mutation-types';

export const setBodyWidth = ({commit}, val) => {
    commit(types.BODY_WIDTH, val);
};
