import React from 'react';
import Footer from '../../pages/containers/Footer';
import FeedList from '../feedList/FeedList';
import Header from '../../pages/containers/Header';
import GlobalStyles from '../../styles/GlobalStyles';
import { styled } from 'styled-components';
import Navigator from '../../pages/containers/Navbar';

const Container = styled('div')`
  width: 100%;
  height: 100%;
`;

const HomePageTemplate = () => {
  return (
    <Container>
      <GlobalStyles />
      <Header />
      {/* FeedList대신 다른 Component로 교체 후 사용*/}
      <FeedList />
      <Footer />
    </Container>
  );
};

export default HomePageTemplate;
