import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Container,ImageDiv, StyledMdAccountCircle } from './user-dipslay.styles';
import { signOutStart } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const UserDisplay = ({user, signOut,history}) => {

  const handleClick = () => {
    user === null ? history.push('/sign-in') : pushToHomeThenSignOut()
  }

  const pushToHomeThenSignOut = () => {
    history.push('/');
    signOut();
  }

  return(
    <Container> 
      <ImageDiv onClick={handleClick}>      
        { user ? <img src={user.photoUrl} alt='user'/>  : <StyledMdAccountCircle size={55} /> }
      </ImageDiv>
    </Container>
  )
}

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOutStart())
});

const mapStateToProps = state => ({
  user: selectCurrentUser(state)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDisplay));