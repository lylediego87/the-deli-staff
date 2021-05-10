import React from 'react'

import { Container, LogoContainer, Logo,} from './header.styles';
import logo from '../../images/EoA_Logo_white.png';
import UserDisplay from '../user-display/user-display';

const Header = () => (
  <Container>
    <LogoContainer>
      <Logo src={logo} />
    </LogoContainer>
    <UserDisplay />
  </Container>
);
 export default Header;