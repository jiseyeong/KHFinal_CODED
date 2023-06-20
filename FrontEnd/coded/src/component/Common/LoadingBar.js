import React from 'react';
import { Oval } from 'react-loader-spinner';
import { styled } from 'styled-components';

const LoadingLayout = styled('div')`
  width: 100%;
  height: 55vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function LoadingBar() {
  return (
    <LoadingLayout>
      <Oval color="#3d66ba" height={100} width={100} />
    </LoadingLayout>
  );
}
export default LoadingBar;
