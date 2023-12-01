import axios from "axios";
import React, { useEffect, useState } from "react";
import useNavigate from "react-dom-route";

function ChatList(props) {
  // props로부터 list를 추출
  const { list = [] } = props; // list가 없거나 비어 있을 때 빈 배열로 초기화
  const { writer = "" } = props;
  const { adoptCommentId = -1 } = props;
  const token = localStorage.getItem("nickname");
  const [changeComment, setChangeComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null); // 수정 중인 댓글의 commentId 상태
  const [adopt, setAdopt] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (adoptCommentId > 0) {
      setAdopt(true);
    } else {
      setAdopt(false);
    }
  }, []);

  //수정모드로 전환
  const onModifyMode = (commentId, content) => {
    // 클릭한 댓글의 commentId를 전달하여 해당 댓글의 수정 상태를 관리
    setEditCommentId(commentId);
    setChangeComment(content);
  };

  // 댓글 삭제 하기
  const onDelete = (commentId) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      axios
        .delete(`/api/comment/${commentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login_token")}`, // 헤더에 토큰을 설정합니다
            validateStatus: false
          },
        })
        .then((res) => {
          if (res.status === 204 || res.status === 200) {
            alert("댓글 삭제 성공!");
            window.location.reload();
          } else if (res.status === 401) {
            alert("토큰이 만료되었거나 로그인하지 않은 사용자입니다.");
            navigate("/", {
              state: {
                logout: true
              }
            });
          } else {
            console.log("수정 실패");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  //수정한거 보내기
  const modifySubmit = (commentId) => {
    if (changeComment.length < 1) {
      alert("댓글은 1글자 이상 입력하세요");
      return;
    }
    axios
      .put(
        `/api/comment/${commentId}`,
        {
          content: changeComment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login_token")}`, // 헤더에 토큰을 설정합니다
            validateStatus: false
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("수정 성공!");
          window.location.reload();
        } else if (res.status === 401) {
          alert("토큰이 만료되었거나 로그인하지 않은 사용자입니다.");
          navigate("/", {
            state: {
              logout: true
            }
          });
        }else {
          console.log("수정 실패");
        }
      })
      .catch((e) => {
        console.log("수정 실패 " + e);
      });
  };

  // 별 누르기
  const clickStar = (commentId) => {
    const confirmAdopt = window.confirm("해당 댓글을 체택하시겠습니까?");
    if (confirmAdopt) {
      axios
        .post(
          `/api/comment/${commentId}/adopt`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login_token")}`, // 헤더에 토큰을 설정합니다
              validateStatus: false
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            alert("채택 완료");
            window.location.reload();
          } else if (res.status === 401) {
            alert("토큰이 만료되었거나 로그인하지 않은 사용자입니다.");
            navigate("/", {
              state: {
                logout: true
              }
            });
          }else {
            console.log("채택 실패");
          }
        })
        .catch((e) => {
          console.log("채택 실패 : " + e);
        });
    } else {
      return;
    }
  };

  return (
    <div className="ChatList">
      <div className="wrap">
        {list.map((item, index) => (
          <div className="ChatWrap">
            <div className="header" key={index}>
              {list.length > 0 &&
                (item.nickname === writer ? (
                  adoptCommentId === item.commentId ? (
                    <div className="writer">
                      {item.nickname} <span>adopted</span>
                    </div>
                  ) : (
                    <div className="writer">{item.nickname}</div>
                  )
                ) : adoptCommentId === item.commentId ? (
                  <div className="other">
                    {item.nickname} <span>adopted</span>
                  </div>
                ) : (
                  <div className="other">{item.nickname}</div>
                ))}

              {list.length > 0 && <div className="time">{item.writeTime}</div>}
              <div className="Button">
                {token === writer ? (
                  adopt ? (
                    <div
                      className={`AdoptStar${
                        adoptCommentId === item.commentId ? "Yes" : ""
                      }`}
                    >
                      <button className="Star" id="star" disabled></button>
                    </div>
                  ) : (
                    <button
                      className="star"
                      id="star"
                      onClick={() => {
                        clickStar(item.commentId);
                      }}
                    ></button>
                  )
                ) : (
                  <div
                    className={`AdoptStar${
                      adoptCommentId === item.commentId ? "Yes" : ""
                    }`}
                  >
                    <button className="star" id="star" disabled></button>
                  </div>
                )}
              </div>
            </div>
            <div className="content">
              {editCommentId === item.commentId ? ( // 수정 중인 댓글 체크
                <textarea
                  className="modifyComment"
                  value={changeComment}
                  onChange={(e) => {
                    setChangeComment(e.target.value);
                  }}
                ></textarea>
              ) : (
                <div>{item.content}</div>
              )}
            </div>
            {item.nickname === token ? (
              editCommentId === item.commentId ? (
                <div className="modifyButton">
                  <button
                    onClick={() => {
                      setEditCommentId(null);
                    }}
                  >
                    취소
                  </button>
                  <button onClick={() => modifySubmit(item.commentId)}>
                    제출
                  </button>
                </div>
              ) : adopt ? (
                <div className="modifyButton">
                  <button
                    onClick={() => {
                      onDelete(item.commentId);
                    }}
                    disabled
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => onModifyMode(item.commentId, item.content)}
                    disabled
                  >
                    수정
                  </button>
                </div>
              ) : (
                <div className="modifyButton">
                  <button
                    onClick={() => {
                      onDelete(item.commentId);
                    }}
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => onModifyMode(item.commentId, item.content)}
                  >
                    수정
                  </button>
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatList;
