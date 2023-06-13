import React from 'react';
import Footer from '../../pages/containers/Footer';
import Header from '../../pages/containers/Header';
import GlobalStyles from '../../styles/GlobalStyles';
import { styled } from 'styled-components';
import Navigator from '../../pages/containers/Navbar';
import FeedListById from '../feedList/FeedListById';

const Container = styled('div')`
  width: 100%;
  height: 100%;
`;

const FeedListByIdWithMain = () => {
  return (
    <Container>
      <GlobalStyles />
      <Header />
      <Navigator />
      {/* FeedList대신 다른 Component로 교체 후 사용*/}
      <FeedListById />
      <Footer />
    </Container>
  );
};

export default FeedListByIdWithMain;
