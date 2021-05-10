import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper';

import { Container, OrderInfoContainer } from './orders.styles';
import { fetchOrdersStart } from '../../redux/order/order.actions';
import { selectOrders } from '../../redux/order/order.selectors';

const OrdersPage = ({fetchOrders, orders}) => {

  const OrderInfo = (data) => {
    return(
      <Paper elevation={3}>
        <OrderInfoContainer>
         {
            orders[data.order] === undefined ? null :
            orders[data.order].items.map(i => 
              <div key={i.id}>
                <p><strong>{i.name}</strong></p>
                <p><strong>{i.description}</strong></p>
                <p><strong>{i.quantity}</strong></p>
              </div>
            )
         } 
        </OrderInfoContainer>
      </Paper>
    )
  }

  const [selectedOrder, setSelectedOrder] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetchOrders();
  },[fetchOrders]);

  return(
  <Container>
    <MaterialTable 
      style={{marginRight: 'auto'}}
      columns={[
        {title: 'Email', field: 'email'},
        {title: 'Total Items', field: 'totalItems'},
        {title: 'Payment Method', field: 'paymentMethod'},
        {title: 'Total Amount', field: 'totalCost'},
        {title: 'Delivery Method', field: 'deliveryMethod'},
        {title: 'Time', field: 'time'},
        {title: 'Order', field: 'date'},
        {title: 'Status', field: 'status'}]}
      data={orders}
      onRowClick={((evt, selectedRow) => {setSelectedRow(selectedRow.tableData.id);setSelectedOrder(selectedRow.tableData.id)})} 
      options={{
        toolbar: false,
        search: false, 
        paging: false, 
        sorting: false, 
        rowStyle: rowData => ({
          backgroundColor: (selectedRow === rowData.tableData.id) ? '#f7d794' : '#FFF'}),
        headerStyle: {
          backgroundColor: '#00280b',
          color: '#FFF',
          fontSize: '1.2rem'
        } 
      }}
    />
    <OrderInfo order={selectedOrder} />
  </Container>
)}

const mapStateToProps = state => ({
  orders: selectOrders(state)
})

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(fetchOrdersStart())
})

export default connect(mapStateToProps,mapDispatchToProps)(OrdersPage);


