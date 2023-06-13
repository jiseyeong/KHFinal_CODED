import React from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette.scss';
import MyProfileForm from './MyProfileForm';

const MyProfileTemplateBlock = styled.div`
  /* background: ${palette.gray}; */
  padding-top: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  margin: 0;
  width: 100%;
`;

const MyProfileTemplate = () => {
  return (
    <MyProfileTemplateBlock>
      <WhiteBox>
        <MyProfileForm />
      </WhiteBox>
    </MyProfileTemplateBlock>
  );
};

export default MyProfileTemplate;
