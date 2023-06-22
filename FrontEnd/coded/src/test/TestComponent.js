import React from 'react';
import { Link } from 'react-router-dom';

const TestComponent = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <Link to="/imageUpload">이미지 업로드</Link>
      <br />
      <br />
      <Link to="/searchLabelSelect">검색 자동완성, 해시태그 입력</Link>
      <br />
      <br />
      <Link to="/caroselTest">캐러셀 테스트</Link>
      <br />
      <br />
      <Link to="/feedInsertTest">캐러셀 파일 첨부 테스트</Link>
    </div>
  );
};

export default TestComponent;
