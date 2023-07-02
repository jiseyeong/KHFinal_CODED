import React from 'react';
import { styled } from 'styled-components';
import ErrorConfirmPage from '../../assets/ButtonAsset/ErrorConfirmPage';

const NoticeDataDiv = styled('div')`
  /* height: 400px; */
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoneSearchedBar = () => {
  return (
    <NoticeDataDiv>
      <ErrorConfirmPage
        message={'표시할 내용이 없습니다.'}
        backPagesCount={-1}
      />
    </NoticeDataDiv>
  );
};

export default NoneSearchedBar;
