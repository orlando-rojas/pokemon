import styled from 'styled-components';

export const Board = styled.div`
  background-color: #f2c438;
  width: 100%;
  height: 700px;
  position: relative;
`;

export const Sprite = styled.img`
  width: 3rem;
  height: 3rem;
  left: ${({ x }) => x + 'px'};
  top: ${({ y }) => y + 'px'};
  position: absolute;
`;

export const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
