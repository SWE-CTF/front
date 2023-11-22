import Editor from "@monaco-editor/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import useDarkMode from "../theme/useDarkMode";


// 언어 목록
const languages = ["javascript", "python", "cpp"];

// 언어와 에디터 상태 연결
const languageEditors = {
  javascript: {
    value: "// Your JavaScript code here",
    label: "JavaScript",
  },
  python: {
    value: "# Your Python code here",
    label: "Python",
  },
  cpp: {
    value: "// Your C++ code here",
    label: "C++",
  },
};

const Challenges = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [theme, toggleTheme] = useDarkMode();
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [activeLanguage, setActiveLanguage] = useState("javascript");

  // 언어 변경 핸들러
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setActiveLanguage(language);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `/api/challenge/${postId}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("게시물을 불러오는 동안 오류가 발생했습니다.", error);
      }
    };

    fetchPost();
  }, [postId]);

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
                <h1>{post.title}</h1>
                <p>{post.body}</p>
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
                  value={languageEditors[selectedLanguage].value}
                  language={selectedLanguage}
                  theme="vs-dark"
                  height="300px"
                />
              </div>
            </>
          ) : (
            <p>문제를 불러오는 중...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Challenges;
