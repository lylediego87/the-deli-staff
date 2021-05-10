import { takeLatest, put, all, call, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import orderActionTypes from './order.types';
import {fetchOrdersSuccess, fetchOrdersFailure} from './order.actions';
import { firestore } from '../../firebase/firebase.utils';

export function* fetchOrdersAsync(){
  const ref = firestore.collection('orders').orderBy('timestamp');
  const channel = eventChannel(emit => ref.onSnapshot(emit));
  try{ 
    while(true) {
      const data = yield take(channel)
      yield call (transformDocs,data);
    }
  } catch (error) {
    yield put(fetchOrdersFailure(error));
  }
}

export function* onFetchOrdersStart() {
  yield takeLatest(orderActionTypes.FETCH_ORDERS_START, fetchOrdersAsync);
}

export function* orderSagas() {
  yield all([call(onFetchOrdersStart)])
}

function* transformDocs(data) {
  let orders = [];
  data.forEach((doc) => {
      const order = {
        id: doc.id,
        email: doc.data().email, 
        items: doc.data().items, 
        phoneNo: doc.data().phoneNo, 
        totalCost: doc.data().totalCost, 
        totalItems: doc.data().totalItems, 
        paymentMethod: doc.data().paymentMethod, 
        address: doc.data().address, 
        displayName: doc.data().displayName, 
        deliveryMethod: doc.data().deliveryMethod,
        date: doc.data().timestamp.toDate().toDateString(),
        time: doc.data().timestamp.toDate().toTimeString().substr(0,8),
        status: doc.data().status
      }
      orders = [...orders, order];
  });

  yield put(fetchOrdersSuccess(orders));
}