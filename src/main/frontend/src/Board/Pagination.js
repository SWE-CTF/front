import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit); // 총 표시해야 할 페이지 수
  const navigate = useNavigate();
  const onWrite = () => {
    if (localStorage.getItem("login") === "true") {
      navigate("/QuestionBoardEdit");
    } else {
      alert("로그인 해주세요");
      navigate(`/login`);
    }
  };
  return (
    <div className="Pagination">
      <nav>
        {/* 이전 버튼 */}
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>
        {/* 페이지 넘버링 */}
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </button>
          ))}
        {/* 다음 버튼 */}
        <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </button>
        <div className="Write">
          <button onClick={onWrite}>글쓰기</button>
        </div>
      </nav>
    </div>
  );
}

export default Pagination;
