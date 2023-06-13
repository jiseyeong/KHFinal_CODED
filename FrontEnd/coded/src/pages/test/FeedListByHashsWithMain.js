import React from 'react';
import Footer from '../../pages/containers/Footer';
import Header from '../../pages/containers/Header';
import GlobalStyles from '../../styles/GlobalStyles';
import { styled } from 'styled-components';
import Navigator from '../../pages/containers/Navbar';
import FeedListByHashs from '../feedList/FeedListByHashs';
import Header from '../../component/Main/Header';
import Footer from '../../component/Main/Footer';

const Container = styled('div')`
  width: 100%;
  height: 100%;
`;

const FeedListByHashsWithMain = () => {
  return (
    <Container>
      <GlobalStyles />
      <Header />
      {/* FeedList대신 다른 Component로 교체 후 사용*/}
      <FeedListByHashs />
      <Footer />
    </Container>
  );
};

export default FeedListByHashsWithMain;
