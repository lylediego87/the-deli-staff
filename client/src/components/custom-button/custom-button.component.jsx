import React from 'react';
import { CustomeButtonContainer } from './custom-button.styles'

const Button = ({children, ...props }) => (
  <CustomeButtonContainer {...props}>
    { children }
  </CustomeButtonContainer>
);

export default Button