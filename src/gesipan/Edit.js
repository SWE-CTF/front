import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const focusInput = useRef();
  const focusTextArea = useRef();
  const navigate = useNavigate();

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const returnBoard = () => {
    navigate("/");
  };

  const Submit = () => {
    if (title.length < 3) {
      alert("제목은 3글자 이상 작성해야합니다.");
      setTitle("");
      focusInput.current.focus();
      return;
    }
    if (content.length < 10) {
      alert("본문은 10글자 이상 작성해야합니다.");
      setContent("");
      focusTextArea.current.focus();
      return;
    }

    axios
      .post("http://localhost:8080/api/push", {
        body: content,
        title: title,
        nickname: "yeongi",
      })
      .then(function (response) {
        console.log(response);
        alert("제출했음");
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="Edit">
      <h2>질문 작성하기</h2>
      <div className="Title">
        <input
          value={title}
          onChange={changeTitle}
          placeholder="제목"
          ref={focusInput}
        ></input>
      </div>
      {/* <div className="Content">
        <textarea
          value={content}
          onChange={changeContent}
          placeholder="본문"
          ref={focusTextArea}
        ></textarea>
      </div> */}
      <CKEditor
        editor={ClassicEditor}
        config={{
          placeholder: "내용을 입력하세요.",
        }}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
      <div className="Button">
        <button className="Cancle" onClick={returnBoard}>
          취소
        </button>
        <button className="Submit" onClick={Submit}>
          제출
        </button>
      </div>
    </div>
  );
};

export default Edit;
