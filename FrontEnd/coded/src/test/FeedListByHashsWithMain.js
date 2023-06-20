import React from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import { styled } from 'styled-components';
import FeedListByHashs from '../component/FeedList/FeedListByHashs';
import NavbarOotd from '../component/Navbar/NavbarOotd/NavbarOotd';
import Footer from '../component/Profile/Component/Footer/Footer';

const Container = styled('div')`
  width: 100%;
  height: 100%;
`;

const FeedListByHashsWithMain = () => {
  return (
    <Container>
      <GlobalStyles />
      {/* FeedList대신 다른 Component로 교체 후 사용*/}
      <FeedListByHashs />
    </Container>
  );
};

export default FeedListByHashsWithMain;
