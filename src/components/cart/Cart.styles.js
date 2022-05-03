import styled from 'styled-components';

export const CartWrapper = styled.div`
  width: 400px;
  padding: 20px 25px 120px 20px;
  position: relative;
  height: 100vh;
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
`;

export const CartFooter = styled.footer`
  bottom: 0;
  right: 0;
  left: 0;
  padding: 30px 20px;
  position: absolute;
  display: flex;
  background-color: #ef5350;
  justify-content: flex-end;
  gap: 20px;
  bordertop: 1px solid blue;
`;

export const ItemsWrapper = styled.div`
  height: 100%;
  overflow: auto;
`;
