import orderActionTypes from './order.types';

export const fetchOrdersStart = () => ({
  type: orderActionTypes.FETCH_ORDERS_START
})

export const fetchOrdersSuccess = allOrders => ({
  type: orderActionTypes.FECTH_ORDERS_SUCCESS,
  payload: allOrders
})

export const fetchOrdersFailure = error => ({
  type: orderActionTypes.FETCH_ORDERS_FAILURE,
  payload: error
})