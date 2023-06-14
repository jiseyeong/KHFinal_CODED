import React from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import { styled } from 'styled-components';
import FeedListById from '../component/FeedList/FeedListById';
import NavbarOotd from '../component/Navbar/NavbarOotd/NavbarOotd';
import Footer from '../component/Profile/Component/Footer/Footer';
const Container = styled('div')`
  width: 100%;
  height: 100%;
`;

const FeedListByIdWithMain = () => {
  return (
    <Container>
      <GlobalStyles />
      <NavbarOotd />
      {/* FeedList대신 다른 Component로 교체 후 사용*/}
      <FeedListById />
      <Footer />
    </Container>
  );
};

export default FeedListByIdWithMain;
