import React from 'react';
import FeedList from '../component/FeedList/FeedList';
import GlobalStyles from '../styles/GlobalStyles';
import { styled } from 'styled-components';
import Navbar from '../component/Navbar/NavbarOotd/NavbarOotd';
import Footer from '../component/Profile/Component/Footer/Footer';

const Container = styled('div')`
  width: 100%;
  height: 100%;
`;

const HomePageTemplate = () => {
  return (
    <Container>
      <GlobalStyles />
      <Navbar />
      {/* FeedList대신 다른 Component로 교체 후 사용*/}
      <FeedList />
      <Footer />
    </Container>
  );
};

export default HomePageTemplate;
