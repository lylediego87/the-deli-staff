import orderActionTypes from './order.types';

const INITIAL_STATE = {
  orders: [],
  error: null,
  isFetching: false
}

const orderReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case orderActionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        isFetching: true
      }
    case orderActionTypes.FECTH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        isFetching: false,
      }
    case orderActionTypes.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        orders: [],
        isFetching: false,
        error: action.payload
      }
    default: 
    return state;
  }
}

export default orderReducer;