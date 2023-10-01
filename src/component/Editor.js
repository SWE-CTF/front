import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Editor = () => {
  const navigate = useNavigate();

  const titleRef = useRef();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const customUploadAdapter = (loader) => {
    // return {
    //   upload() {
    //     return new Promise((resolve, reject) => {
    //       const formData = new FormData();
    //       loader.file.then((file) => {
    //         formData.append("file", file);

    //         axios
    //           .post("http://localhost:8080/api/v0/file/upload", formData)
    //           .then((res) => {
    //             resolve({
    //               default: res.data.data.uri,
    //             });
    //           })
    //           .catch((err) => reject(err));
    //       });
    //     });
    //   },
    // };
    return {
      upload() {
        return ((resolve, reject) => {
          const formData = new FormData();
          loader.file.then((file) => {
            formData.append("file", file);

            axios
              .post("http://localhost:8080/api/v0/file/upload", formData)
              .then((res) => {
                resolve({
                  default: res.data.data.uri,
                });
              })
              .catch((err) => reject(err));
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  const handleSubmit = () => {
    if (title.length < 1) {
      titleRef.current.focus();
      return;
    }

    const data = {
      title,
      body,
    };

    axios.post("http://localhost:8080/api/v0/post", data).then((res) => {
      if (res.status === 200) {
        navigate("/", { replace: true });
        return;
      } else {
        alert("업로드 실패.");
        return;
      }
    });
  };

  return (
    <div className="Editor">
      <div className="Input">
        <section>
          <div className="title-wrapper">
            제목 :{" "}
            <input
              className="input-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              ref={titleRef}
            />
          </div>
        </section>
        <section>
          <CKEditor
            editor={ClassicEditor}
            data=""
            config={{
              extraPlugins: [uploadPlugin],
              placeholder: "내용을 입력하세요",
            }}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              setBody(editor.getData());
              console.log({ event, editor, body });
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </section>
      </div>
      <section>
        <div className="control-box">
          <div className="cancel-btn-wrapper">
            <button
              className="cancle"
              onClick={() => navigate(-1, { replace: true })}
            >
              취소
            </button>
          </div>
          <div className="submit-btn-wrapper">
            <button className="submit" onClick={handleSubmit}>
              완료
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Editor;
