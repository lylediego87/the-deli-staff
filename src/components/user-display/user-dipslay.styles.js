import styled from 'styled-components';
import { MdAccountCircle } from 'react-icons/md';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 10px;
`;

export const ImageDiv = styled.div`
  max-height: 55px;
  max-width: 55px;

  img {
    border-radius: 50%;
    max-width: 100%;
    max-height: 100%;
  }
`;

export const StyledMdAccountCircle = styled(MdAccountCircle)`
  color: #fff;
`;