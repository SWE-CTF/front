import Editor from "@monaco-editor/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import useDarkMode from "../theme/useDarkMode";
// 언어 목록
const languages = ["java", "python", "c"];

// 언어와 에디터 상태 연결
const languageEditors = {
  java: {
    value: `// your java code here
public class Main {
  public static void main(String[] args) {

  }
}`,
    label: "java",
  },
  python: {
    value: `# Your Python code here
import sys
`,
    label: "python",
  },
  c: {
    value: `// Your C code here
#include <stdio.h>
#include <stdlib.

int main(int argc, char *argv[]) {

  return 0;
}`,
    label: "c",
  },
};

const Challenges = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [theme, toggleTheme] = useDarkMode();
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [activeLanguage, setActiveLanguage] = useState("java");
  const [code, setCode] = useState(languageEditors["java"].value);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const token = localStorage.getItem("login_token");

  const languages = ["java", "python", "c"];


  // 언어 변경 핸들러
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setActiveLanguage(language);
    setCode(languageEditors[language].value);
  };

  const handleInputChange = (e) => {
    setCode(e);

  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      // 사용자가 확인을 누르면 삭제 요청 보내기
      axios
        .delete(`/api/challenge/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // yourTokenHere에 실제 토큰을 넣어주세요
          },
        }, { validateStatus: false })
        .then((res) => {
          if (res.status === 204 || res.status === 200) {
            console.log("게시물 삭제가 완료되었습니다:", res.data);
            navigate("/Problem");
            // 삭제 완료 후 필요한 작업 수행
          } else if (res.status === 500 || res.status === 404) {
            console.log("에러발생");
          }
        })
        .catch((error) => {
          console.error("게시물 삭제에 실패했습니다:", error);
          // 삭제 실패 시 처리할 작업 수행
        });
    }
  };

  const handleQuestion = () => {
    navigate('/QuestionBoard', {
      state: {
        cid: `${postId}`
      },
    });
  }

  const handleUpdate = () => {
    navigate("/WriteBoard", {
      state: {
        update: true
      }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(post);
    console.log(localStorage);
    const data = {
      "challengeId": postId,
      "code": encodeURIComponent(code),
      "language": selectedLanguage
    };

    console.log(data);
    await axios
      .post(`/api/attempt/challenge`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // yourTokenHere에 실제 토큰을 넣어주세요
        },
      }, { validateStatus: false })
      .then((res) => {
        if (res.status === 200) {
          navigate("/Results", {
            state:
            {
              cid: postId,
              ctitle: post.title
            }
          });

        } else if (res.status === 500 || res.status === 400) {
          alert("에러발생");
        }
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }

  const userCheck = () => {
    return localStorage.getItem("nickname") === post.examiner || localStorage.getItem("role") === "ROLE_ADMIN";
  }

  useEffect(() => {
    console.log(localStorage);
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `/api/challenge/${postId}`
        );

        if (response.status !== 200) {
          throw new Error(`Error! status: ${response.status}`);
        }

        setPost(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("게시물을 불러오는 동안 오류가 발생했습니다.", error);
      }
    };

    fetchPost();
  }, [postId]);

  const newlineText = (content) => {
    return content.split('\n').map(str => <p>{str}</p>);
  }

  return (
    <div className={`container ${theme.dark ? "dark" : "light"}`}>
      <HomeButton />
      <div className="darkBtn">
        <button onClick={toggleTheme}>
          {theme.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
      <div className={`ChallengesForm `}>
        <div className="ChallengesContent">
          {post ? (
            <>
              <div className="ChallengesLeft">
                <div className="ChallengesTitle">
                  {post.title}
                </div>
                <p>{newlineText(post.content)}</p>
                <h3>Test case 1</h3>
                <h4>Input</h4>
                <div>{post.testcases[0]['input']}</div>
                <h3>Output</h3>
                <div>{post.testcases[1]['output']}</div>
                <h2>Test case 2</h2>
                <h3>Input</h3>
                <div>{post.testcases[0]['input']}</div>
                <h3>Output</h3>
                <div>{post.testcases[1]['output']}</div>
              </div>
              <div className="ChallengesRight">
                <h3>Select Language:</h3>
                {languages.map((language) => (
                  <button
                    className={`LangBtn ${activeLanguage === language ? "active" : ""}`}
                    key={language}
                    onClick={() => handleLanguageChange(language)}
                  >
                    {languageEditors[language].label}
                  </button>
                ))}
                <h3>{languageEditors[selectedLanguage].label} Code Input Area:</h3>
                <Editor
                  name="code"
                  value={code}
                  language={selectedLanguage}
                  onChange={handleInputChange}
                  theme="vs-dark"
                  height="300px"
                />
                <button onClick={handleSubmit}>채점하기</button>
                <button onClick={() => setModalIsOpen(true)}>힌트보기</button>
                <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                  {post.hint}
                  <button onClick={() => setModalIsOpen(false)}>close</button>
                </Modal>
                {userCheck() ? <button onClick={handleDelete} >삭제하기</button> : <></>}
                {userCheck() ? <button onClick={handleUpdate} >수정하기</button> : <></>}
              </div>
            </>
          ) : (
            <p>문제를 불러오는 중...</p>
          )}
        </div>
      </div>
      <button onClick={handleQuestion}>질문하기</button>
    </div>
  );
};

export default Challenges;
