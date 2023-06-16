import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FeedPhotoUpload = () => {
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
    alert(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedPostId === Number(e.target.value)) {
      alert('0이 아닌 값을 입력해주세요.');
      return;
    }
    alert('a');

    const formData = new FormData();
    formData.append('feedPostId', feedPostId);

    // formData.append('file', file);
    // 파일 하나만 넣는 경우
    files.forEach((file) => {
      formData.append('files', file);
    });

    setFeedPostId(0);

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
      })
      .catch((resp) => console.log(resp));
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

const UserProfileUpload = () => {
  const [userNo, setUserNo] = useState(0);
  const [file, setFile] = useState(null);
  // 파일 하나를 받는 경우
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios({
      url: '/selectUserList',
      type: 'GET',
    }).then((resp) => {
      setUserList(resp.data);
    });
  }, []);
  const handleChange = (e) => {
    setFeedPostId(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    // 파일 하나를 받는 경우
    alert(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userNo === Number(e.target.value)) {
      alert('0이 아닌 값을 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('userNo', userNo);

    formData.append('file', file);
    // 파일 하나만 넣는 경우

    setUserNo(0);

    axios({
      method: 'POST',
      url: '/photo/insertPhoto/',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
      .then((resp) => {
        console.log('완료 : ' + resp.data);
      })
      .catch((resp) => console.log(resp));
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
            onChange={handleChange}
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
  return (
    <div>
      <FeedPhotoUpload></FeedPhotoUpload>
      <br />
      <hr />
      <br />
      <UserProfileUpload></UserProfileUpload>
    </div>
  );
};

export default FileUploadTest;
