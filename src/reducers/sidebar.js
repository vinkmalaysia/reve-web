import { HYDRATE } from 'next-redux-wrapper';

const types = {
  SHOW: 'app/sidebar/SHOW',
  HIDE: 'app/sidebar/HIDE',
};

export const actions = {
  show: () => ({
    type: types.SHOW,
  }),
  hide: () => ({
    type: types.HIDE,
  }),
};

const initialState = {
  isVisible: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case HYDRATE:
      return state;

    case types.SHOW:
      return {
        ...state,
        isVisible: true,
      };

    case types.HIDE:
      return {
        ...state,
        isVisible: false,
      };

    default:
      return state;
  }
}
