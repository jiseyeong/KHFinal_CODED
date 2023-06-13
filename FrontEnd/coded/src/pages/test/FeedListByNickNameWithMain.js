import React from 'react';
import GlobalStyles from '../../styles/GlobalStyles';
import { styled } from 'styled-components';
import FeedListByNickName from '../feedList/FeedListByNickName';
import Header from '../../component/Main/Header';
import Footer from '../../component/Main/Footer';

const Container = styled('div')`
  width: 100%;
  height: 100%;
`;

const FeedListByNickNameWithMain = () => {
  return (
    <Container>
      <GlobalStyles />
      <Header />
      {/* FeedList대신 다른 Component로 교체 후 사용*/}
      <FeedListByNickName />
      <Footer />
    </Container>
  );
};

export default FeedListByNickNameWithMain;
