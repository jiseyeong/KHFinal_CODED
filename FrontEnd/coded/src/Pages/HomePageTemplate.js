import React from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import { styled } from 'styled-components';
import Footer from '../component/Profile/Component/Footer/Footer';
import NavbarOotd from '../component/Navbar/NavbarOotd/NavbarOotd';
import FeedList from '../component/FeedList/FeedList';

const Container = styled('div')`
  width: 100%;
  height: 100%;
`;

const HomePageTemplate = () => {
  return (
    <Container>
      <GlobalStyles />
      <NavbarOotd />
      {/* FeedList대신 다른 Component로 교체 후 사용*/}
      <FeedList />
      <Footer />
    </Container>
  );
};

export default HomePageTemplate;
