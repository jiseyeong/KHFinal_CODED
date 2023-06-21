import { useRef } from 'react';

// Toast 에디터
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

function ToastUI() {


    
  return (
    <div className="container">
      <div>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          style={{ width: '100%', height: '50px' }}
        ></input>
      </div>
      <br />
      <Editor
        placeholder="내용을 입력해주세요."
        previewStyle="vertical" // 미리보기 스타일 지정
        height="350px" // 에디터 창 높이
        initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
        hideModeSwitch={true}
        toolbarItems={false}
      ></Editor>
      <br/>



      <div>
        {/* <label className="input-file-button" for="input-file">
          사진 등록
        </label> */}
        {/* <input type="file" id="input-file" style={{display:"none"}} accept="image/gif,image/jpeg,image/png" multiple></input> */}
        <input type="file" accept="image/gif,image/jpeg,image/png" multiple></input>
      </div>
      <br/>
      <div align="right">
        <button>작성 완료</button>
      </div>
    </div>
  );
}

export default ToastUI;
