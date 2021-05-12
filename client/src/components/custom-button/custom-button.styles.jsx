import styled, { css } from 'styled-components';

const getButtonStyles = props => {
  if(props.type){
    switch(props.type){
      case "danger":
        return dangerStyles
      default:
        return regularButtonStyles
    }
  }
  return regularButtonStyles; 
}

const regularButtonStyles = css`
  background-color: #00280b;
  color: white;
  border: none;
  margin: 0 2px;
`

const dangerStyles = css`
  background-color:  #f6b93b;
  color: black;
  border: none;
`
export const CustomeButtonContainer = styled.button`
  min-width: 140px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;

  ${getButtonStyles}
`

