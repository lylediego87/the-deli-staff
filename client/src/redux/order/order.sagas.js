import { takeLatest, put, all, call, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import moment from 'moment';

import orderActionTypes from './order.types';
import {fetchOrdersSuccess, fetchOrdersFailure, setOrderStatusFailure} from './order.actions';
import { firestore } from '../../firebase/firebase.utils';

export function* fetchOrdersAsync(){
  const midnightThisMorning = moment().startOf('day').toDate();
  const ref = firestore.collection('orders')
    .where('timestamp','>', midnightThisMorning)
    .orderBy('timestamp', 'desc');
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

export function* completeOrder({payload}){
  const ref = firestore.doc(`orders/${payload.orderId}`);
  try {
    ref.set({status: 'completed' },{merge: true});
    yield call(notifyWithSMS, payload.phoneNo);
  } catch (error) {
    yield put(setOrderStatusFailure(error));
  }
}

export function* closeOrder({payload}){
  const ref = firestore.doc(`orders/${payload.orderId}`);
  try {
    ref.set({status: 'closed' },{merge: true});
  } catch (error) {
    yield put(setOrderStatusFailure(error));
  }
}

export function* onFetchOrdersStart() {
  yield takeLatest(orderActionTypes.FETCH_ORDERS_START, fetchOrdersAsync);
}

export function* onSetOrderStatusComplete(){
  yield takeLatest(orderActionTypes.SET_ORDER_STATUS_COMPLETE, completeOrder);
}

export function* onSetOrderStatusClosed(){
  yield takeLatest(orderActionTypes.SET_ORDER_STATUS_CLOSED, closeOrder);
}

export function* orderSagas() {
  yield all([
    call(onFetchOrdersStart),
    call(onSetOrderStatusComplete),
    call(onSetOrderStatusClosed)
  ])
}
 
function* notifyWithSMS(phoneNo) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phoneNo: phoneNo }),
  }
  const response = yield fetch('/api/nofifyWtihSms', options);
  const body = yield response.text();
  yield console.log(body);
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