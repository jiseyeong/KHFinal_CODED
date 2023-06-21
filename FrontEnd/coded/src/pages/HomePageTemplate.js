import React from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import { styled } from 'styled-components';
import Footer from '../component/Profile/Component/Footer/Footer';
import FeedList from '../component/FeedList/FeedList';
import Navbar from '../component/Navbar/Navbar';

const Container = styled('div')`
  width: 100%;
  height: 100%;
`;

const HomePageTemplate = () => {
  return (
    <Container>
      <GlobalStyles />
      {/* mem, nonMem, weekly 의 3종 타입 존재 */}
      {/* <Navbar type="mem"/>  */}
      {/* FeedList대신 다른 Component로 교체 후 사용*/}
      <FeedList />
    </Container>
  );
};

export default HomePageTemplate;
