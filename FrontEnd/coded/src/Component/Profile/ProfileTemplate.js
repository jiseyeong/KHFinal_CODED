import React from 'react';
import styled from 'styled-components';
import ProfileForm from './ProfileForm';

const ProfileTemplateBlock = styled.div`
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

const ProfileTemplate = () => {
  return (
    <ProfileTemplateBlock>
      <WhiteBox>
        <ProfileForm />
      </WhiteBox>
    </ProfileTemplateBlock>
  );
};

export default ProfileTemplate;
