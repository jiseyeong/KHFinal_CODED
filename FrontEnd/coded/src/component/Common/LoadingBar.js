import React from 'react';
import { styled } from 'styled-components';
import { DotPulse } from '@uiball/loaders';

<DotPulse size={40} speed={1.3} color="black" />;

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
      <div className="dot-pulse">
        <div className="dot-pulse__dot"></div>
      </div>
    </LoadingLayout>
  );
}
export default LoadingBar;
