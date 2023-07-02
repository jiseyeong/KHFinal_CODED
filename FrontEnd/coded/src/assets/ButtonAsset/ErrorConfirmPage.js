import React from 'react';
import { styled } from 'styled-components';
import BackButton from './BackButton';
import { useNavigate } from 'react-router-dom';

const ComfirmLayout = styled('div')`
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BackButton2 = styled('button')`
  border: none;
  border-radius: 20px;
  width: 130px;
  height: 35px;
  background-color: black;
  color: white;
  margin-top: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
`;

const ErrorConfirmPage = ({ message, backPagesCount, removeButton }) => {
  const navigate = useNavigate();
  return (
    <ComfirmLayout>
      <h2>{message}</h2>
      {!removeButton && (
        <BackButton2
          onClick={() => {
            navigate(backPagesCount);
          }}
        >
          뒤로 가기
        </BackButton2>
      )}
    </ComfirmLayout>
  );
};

export default ErrorConfirmPage;
