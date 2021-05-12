import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import orderReducer from './order/order.reducer';

const rootReducer = () => combineReducers({
  user: userReducer,
  order: orderReducer
});

export default rootReducer;