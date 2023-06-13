import React from 'react';
import GlobalStyles from '../../styles/GlobalStyles';
import { styled } from 'styled-components';
import Header from '../../component/Main/Header';
import Footer from '../../component/Main/Footer';
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
      {/* FeedList대신 다른 Component로 교체 후 사용*/}
      <FeedListById />
      <Footer />
    </Container>
  );
};

export default FeedListByIdWithMain;
