import React from 'react';
import { styled } from 'styled-components';

const NoticeDataDiv = styled('div')`
  height: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoneSearchedBar = () => {
  return (
    <NoticeDataDiv>
      <h3>표시할 내용이 없습니다.</h3>
    </NoticeDataDiv>
  );
};

export default NoneSearchedBar;
