import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Provider } from 'react-redux';

const FeedPhotoUpload = ({ uploadState, setUploadState }) => {
  const [feedPostId, setFeedPostId] = useState(0);
  const [files, setFiles] = useState([]);
  // 여러 파일을 받는 경우
  const [feedList, setFeedList] = useState([]);

  useEffect(() => {
    axios({
      url: '/feedpost/selectfeedlist/',
      method: 'GET',
    }).then((resp) => {
      setFeedList(resp.data);
    });
  }, []);

  const handleChange = (e) => {
    setFeedPostId(e.target.value);
  };

  const handleFileChange = (e) => {
    // const selectedFile = e.target.files[0];
    // setFile(selectedFile);
    // 파일 하나를 받는 경우
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedPostId === Number(e.target.value)) {
      alert('0이 아닌 값을 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('feedPostId', feedPostId);

    // formData.append('file', file);
    // 파일 하나만 넣는 경우
    files.forEach((file) => {
      formData.append('files', file);
    });

    axios({
      method: 'post',
      url: '/photo/insertPhoto',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
      .then((resp) => {
        console.log('완료 : ' + resp.data);
        setUploadState(
          '피드 번호 : ' + feedPostId + ' : ' + files[0].name + ' 업로드 완료',
        );
        setFiles([]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      피드 내 이미지 업로드
      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*"
          />
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            value={feedPostId}
            onChange={handleChange}
          />
          <button type="submit">전송</button>
        </p>
      </form>
      <p>
        피드 번호들 :
        {feedList.map((e) => {
          return `${e.feedPostId} / `;
        })}
      </p>
    </div>
  );
};

const UserProfileUpload = ({ uploadState, setUploadState }) => {
  const [userNo, setUserNo] = useState(0);
  const [file, setFile] = useState([]);
  // 파일 하나를 받는 경우
  const [userList, setUserList] = useState([]);

  // 유저 리스트 출력
  useEffect(() => {
    axios({
      url: '/auth/selectUserList',
      type: 'GET',
    }).then((resp) => {
      setUserList(resp.data);
    });
  }, []);

  const handleUserChange = (e) => {
    setUserNo(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    // 파일 하나를 받는 경우
  };

  // 파일 업로드
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userNo === Number(e.target.value)) {
      alert('0이 아닌 값을 입력해주세요.');
      return;
    }

    const formData = new FormData();
    console.log(file);
    formData.append('userNo', userNo);
    formData.append('files', file);
    // 파일 하나만 넣는 경우

    axios({
      method: 'post',
      url: '/photo/insertPhoto',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
      .then((resp) => {
        setUploadState(
          '유저 넘버 : ' + userNo + ' : ' + file.name + ' 업로드 완료',
        );
        setFile([]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      유저의 프로필 사진 업로드
      <form onSubmit={handleSubmit}>
        <p>
          <input type="file" onChange={handleFileChange} accept="image/*" />
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            value={userNo}
            onChange={handleUserChange}
          />
          <button type="submit">전송</button>
        </p>
      </form>
      <p>
        유저 번호들 :
        {userList.map((e) => {
          return `${e.userNo} / `;
        })}
      </p>
    </div>
  );
};

const FileUploadTest = () => {
  const [uploadState, setUploadState] =
    useState('이미지 파일을 업로드 해주세요');
  return (
    <div>
      <FeedPhotoUpload {...{ uploadState, setUploadState }}></FeedPhotoUpload>
      <br />
      <hr />
      <br />
      <UserProfileUpload
        {...{ uploadState, setUploadState }}
      ></UserProfileUpload>
      <br />
      <hr />
      <br />
      <p>{uploadState}</p>
    </div>
  );
};

export default FileUploadTest;
