import React from 'react';
import Footer from '../../containers/Footer';
import FeedList from '../feedList/FeedList';
import Header from '../../containers/Header';
import GlobalStyles from '../../styles/GlobalStyles';
import { styled } from 'styled-components';
import Navigator from '../../containers/Navigator';

const Container = styled('div')`
  width: 100%;
  height: 100%;
`;

const HomePage = () => {
  return (
    <Container>
      <GlobalStyles />
      <Header />
      <Navigator />
      <FeedList />
      <Footer />
    </Container>
  );
};

export default HomePage;
