import React from 'react';
import { styled } from 'styled-components';

const NoticeDataDiv = styled('div')`
  height: 200px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoneSearchedBar = () => {
  return <NoticeDataDiv>표시할 내용이 없습니다.</NoticeDataDiv>;
};

export default NoneSearchedBar;
