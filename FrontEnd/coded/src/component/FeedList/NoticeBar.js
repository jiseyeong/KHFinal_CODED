import React from 'react';
import { styled } from 'styled-components';

const NoticeBarLayout = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoticeDataDiv = styled('div')`
  width: 1180px;
  height: 50px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
`;

const SilverHor = styled('hr')`
  width: 50%;
  background: #f2f2f2;
  height: 1px;
  border: 0;
`;

const NoticeBar = ({ keyword }) => {
  return (
    <NoticeBarLayout>
      <NoticeDataDiv>검색 결과</NoticeDataDiv>
    </NoticeBarLayout>
  );
};

export default NoticeBar;
