import React, {useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import { GlobalStyles } from './global.styles';
import Header from './components/header/header';
import OrdersPage from './pages/orders/orders';
import SignIn from './components/sign-in/sign-in';
import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

function App({checkSession,currentUser}) {

  useEffect(() => {
    checkSession();
  }, [checkSession])


  return (  
    <div>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route exact path='/' component={OrdersPage} />
        <Route exact path='/sign-in' render={() => currentUser ? <Redirect to='/'/> : <SignIn/> } />
      </Switch>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  checkSession: () => dispatch(checkUserSession()),
});

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
