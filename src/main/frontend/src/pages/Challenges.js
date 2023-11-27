import Editor from "@monaco-editor/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
#include <stdlib.h>

int main(int argc, char *argv[]) {

  return 0;
}`,
    label: "c",
  },
};

const Challenges = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [theme, toggleTheme] = useDarkMode();
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [activeLanguage, setActiveLanguage] = useState("java");
  const [code, setCode] = useState(languageEditors["java"].value);
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      "challengeId": postId,
      "code":encodeURIComponent(code),
      "language": selectedLanguage
    };

    console.log(data);
    try {
      const response = await axios.post("/api/attempt/challenge", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login_token")}`
        },
      });

      if (response.status !== 200) {
        throw new Error(`Error! status: ${response.status}`);
      }

    } catch (error) {
      console.error(error);
    }


  }

  const handleHint = async (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `/api/challenge/${postId}`
        );

        if (response.status !== 200) {
          throw new Error(`Error! status: ${response.status}`);
        }

        setPost(response.data);
      } catch (error) {
        console.error("게시물을 불러오는 동안 오류가 발생했습니다.", error);
      }
    };

    fetchPost();
  }, [postId]);

  const newlineText = (content) => {
    return content.split('\n').map(str => <p>{str}</p>);
  }

  // const testCases = (e) => {
  //   return <p></p>
  // }

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
                  <button onClick={handleHint}>힌트보기</button>
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
