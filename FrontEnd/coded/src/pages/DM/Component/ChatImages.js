import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

const UploadImageLayout = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadImage = styled('img')`
  max-width: 200px;
  max-height: 200px;
  object-fit: contain;
`;

const ChatImages = ({ messageId }) => {
  const [photoList, setPhotoList] = useState([]);
  const accessToken = useSelector((state) => state.member.access);

  useEffect(() => {
    axios({
      url: '/photo/dm',
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        messageId: messageId,
      },
    })
      .then((resp) => {
        //set
        setPhotoList(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <UploadImageLayout>
      {photoList.map((item, index) => {
        return (
          <UploadImage
            className="uploadImage"
            key={index}
            src={`/images/${item.sysName}`}
            alt="이미지"
          />
        );
      })}
    </UploadImageLayout>
  );
};

export default ChatImages;
