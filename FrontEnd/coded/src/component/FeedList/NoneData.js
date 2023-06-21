import React from 'react';
import { styled } from 'styled-components';

const NoneDataDiv = styled('div')`
  text-align: center;
`;

const NoneData = () => {
  return <NoneDataDiv>표시할 내용이 없습니다.</NoneDataDiv>;
};

export default NoneData;
