import React from 'react';
import styled, { css } from 'styled-components';
/* 여기서 스타일 적용하면 여러 곳에서 같은 스타일의 버튼을 사용 가능. */

const StyledButton = styled.button`
  border: none;
  border-radius: 20px;
  height: 35px;
  background-color: black;
  color: white;
  margin-left: 10px;
  cursor: pointer;
  font-size: 12px;

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}
`;

const Button = (props) => <StyledButton {...props} />;

export default Button;
