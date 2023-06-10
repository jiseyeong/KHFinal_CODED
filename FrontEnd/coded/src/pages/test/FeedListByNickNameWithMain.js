import React from 'react';
import Footer from '../../containers/Footer';
import Header from '../../containers/Header';
import GlobalStyles from '../../styles/GlobalStyles';
import { styled } from 'styled-components';
import Navigator from '../../containers/Navigator';
import FeedListById from '../feedList/FeedListById';
import FeedListByNickName from '../feedList/FeedListByNickName';

const Container = styled('div')`
  width: 100%;
  height: 100%;
`;

const FeedListByNickNameWithMain = () => {
  return (
    <Container>
      <GlobalStyles />
      <Header />
      <Navigator />
      {/* FeedList대신 다른 Component로 교체 후 사용*/}
      <FeedListByNickName />
      <Footer />
    </Container>
  );
};

export default FeedListByNickNameWithMain;
