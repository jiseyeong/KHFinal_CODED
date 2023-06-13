import React from 'react';
import FeedList from '../feedList/FeedList';
import GlobalStyles from '../../styles/GlobalStyles';
import { styled } from 'styled-components';
import Header from '../../component/Main/Header';
import Footer from '../../component/Main/Footer';

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
