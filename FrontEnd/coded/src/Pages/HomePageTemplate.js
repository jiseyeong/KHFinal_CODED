import React from 'react';
import FeedList from '../Component/FeedList/FeedList';
import GlobalStyles from '../../Styles/GlobalStyles';
import { styled } from 'styled-components';
import Navbar from '../Component/Navbar/NavbarOotd/NavbarOotd'
import Footer from '../../Component/Profile/Component/Footer/Footer';

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
