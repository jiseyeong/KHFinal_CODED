import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FileUploadTest = () => {
  const [title, setTitle] = useState('');

  //   const [file, setFile] = useState(null);
  // 파일 하나를 받는 경우
  const [files, setFiles] = useState([]);
  // 여러 파일을 받는 경우

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
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

    const formData = new FormData();
    formData.append('title', title);

    // formData.append('file', file);
    // 파일 하나만 넣는 경우
    files.forEach((file) => {
      formData.append('files', file);
    });

    setTitle('');

    axios({
      method: 'POST',
      url: '/feedpost/insertTest/',
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
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          accept="image/*"
        ></input>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={handleTitleChange}
        ></input>
        <button type="submit">전송</button>
      </form>
    </div>
  );
};

export default FileUploadTest;
