import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table'
import Card from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Container, OrderInfoContainer, ActionButtons } from './orders.styles';
import { fetchOrdersStart, setOrderStatusComplete } from '../../redux/order/order.actions';
import { selectOrders } from '../../redux/order/order.selectors';
import Button from '../../components/custom-button/custom-button.component';

const OrdersPage = ({fetchOrders, orders,completeOrder}) => {

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetchOrders();
  },[fetchOrders]);

  return(
  <Container>
    <MaterialTable 
      columns={[
        {title: 'Email', field: 'email'},
        {title: 'Phone No', field: 'phoneNo'},
        {title: 'Total Items', field: 'totalItems'},
        {title: 'Payment Method', field: 'paymentMethod'},
        {title: 'Total Amount', field: 'totalCost'},
        {title: 'Delivery Method', field: 'deliveryMethod'},
        {title: 'Time', field: 'time'},
        {title: 'Order', field: 'date'},
        {title: 'Status', field: 'status'}
      ]}
      data={orders}
      onRowClick={((evt, selectedRow) => 
          {setSelectedRow(selectedRow.tableData.id);setSelectedOrder(orders[selectedRow.tableData.id])})} 
      options={{
        toolbar: false,
        search: false, 
        paging: false, 
        sorting: false, 
        rowStyle: rowData => ({
          backgroundColor: (selectedRow === rowData.tableData.id) ? '#f6b93b' : '#FFF'}),
        headerStyle: {
          backgroundColor: '#00280b',
          color: '#FFF',
          fontSize: '1.2rem'
        } 
      }}
    />
    {
      selectedOrder === null ? null :
      <Card elevation={3} style={{marginLeft: '40px', minHeight: '470px', flexGrow: '1'}}>
        <CardHeader   title="Order Info" />
        <CardContent>
          <OrderInfoContainer>
            {
              selectedOrder.items.map(i => 
                <div key={i.id}>
                  <p><strong>Name - {i.name}</strong></p>
                  <p><strong>Descrition - {i.description}</strong></p>
                  <p><strong>Quantity - {i.quantity}</strong></p>
                </div>
              )
            } 
          </OrderInfoContainer>
        </CardContent>
        <CardActions>
          <ActionButtons>
            {
              selectedOrder.status === "open" 
              ?
                <Button onClick={() => completeOrder({orderId: selectedOrder.id, phoneNo: selectedOrder.phoneNo})}>
                  Complete Order
                </Button>
              :
              <Button>Close Order</Button>
            }
          </ActionButtons>
        </CardActions>
      </Card>
    }
  </Container>
)}

const mapStateToProps = state => ({
  orders: selectOrders(state)
})

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(fetchOrdersStart()),
  completeOrder: (payload) => dispatch(setOrderStatusComplete(payload))
})

export default connect(mapStateToProps,mapDispatchToProps)(OrdersPage);


