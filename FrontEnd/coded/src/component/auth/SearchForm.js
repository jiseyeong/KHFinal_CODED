import axios from 'axios';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './SearchForm.module.scss';

const textMap = {
  id: 'SEARCH ID',
  pw: 'RESET PASSWORD',
};

function SearchForm({ type }) {
  const text = textMap[type];

  const emailRef = useRef(null);
  const [message, setMessage] = useState();
  const idRef = useRef(null);
  const nickNameRef = useRef(null);
  const [loading, setLoding] = useState(false);

  function doIdSearch() {
    setLoding(true);
    axios({
      method: 'get',
      url: '/auth/memberIdByEmail',
      params: {
        email: emailRef.current.value,
      },
    })
      .then((response) => {
        setLoding(false);
        setMessage("찾은 아이디는 '" + response.data + "' 입니다.");
      })
      .catch((error) => {
        setLoding(false);
        if (error.request.status == 400) {
          setMessage(error.response.data);
        } else {
          console.log(error);
        }
      });
    setLoding(false);
  }

  function doPwSearch() {
    setLoding(true);
    axios({
      method: 'post',
      url: '/auth/send-mail/pw',
      params: {
        email: emailRef.current.value,
        userId: idRef.current.value,
        userNickName: nickNameRef.current.value,
      },
    })
      .then((response) => {
        setLoding(false);
        setMessage(response.data);
      })
      .catch((error) => {
        setLoding(false);
        if (error.request.status == 400) {
          setMessage(error.response.data);
        } else {
          console.log(error);
        }
      });
  }

  return (
    <div className={style.idSearchForm}>
      <div className={style.title}>{text}</div>
      <div className={style.idSearchInputBox}>
        <input
          className={style.idSearchInput}
          autoComplete="email"
          type="text"
          placeholder="이메일을 입력해주세요"
          ref={emailRef}
        />
      </div>
      {type === 'pw' && (
        <>
          <div className={style.pwSearchInputBox1}>
            <input
              className={style.pwSearchInputId}
              autoComplete="username"
              type="text"
              placeholder="아이디를 입력해주세요"
              ref={idRef}
            />
          </div>
          <div className={style.pwSearchInputBox2}>
            <input
              className={style.pwSearchInputNickname}
              autoComplete="name"
              type="text"
              placeholder="닉네임을 입력해주세요"
              ref={nickNameRef}
            />
          </div>
        </>
      )}

      <div className={style.searchMessage}>{message}</div>

      {loading ? (
        <div className={style.searchMessage}>진행 중입니다.</div>
      ) : (
        <button
          className={style.searchBtn}
          onClick={type === 'id' ? doIdSearch : doPwSearch}
        >
          {type === 'id' ? '아이디 찾기' : '비밀번호 재발급'}
        </button>
      )}
      <div className={style.loginLink}>
        <Link to="/login">LOGIN</Link>
      </div>
    </div>
  );
}

export default SearchForm;
