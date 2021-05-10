import React from 'react';
import { connect } from 'react-redux';

import { Container, GoogleButton } from './sign-in.styles';
import { googleSignInStart } from '../../redux/user/user.actions';

const SignIn = ({ signInWithGoogle }) => (

  <Container>
    <GoogleButton onClick={signInWithGoogle}>Sign In With Google</GoogleButton>
  </Container>
)

const mapDispatchToProps = dispatch => ({
  signInWithGoogle: () => dispatch(googleSignInStart())
});

export default connect(null,mapDispatchToProps)(SignIn);