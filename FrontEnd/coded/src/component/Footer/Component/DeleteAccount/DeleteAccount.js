import React from 'react';
import { styled } from 'styled-components';

const Layout = styled('div')`
  width: 100%;
  height: 55vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function DeleteAccount() {
  return (
    <Layout>
      <div className="preloader">

      </div>
    </Layout>
  );
}
export default DeleteAccount;
