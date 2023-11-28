import { useNavigate } from "react-router-dom";

function RankPagination({ total, limit, page, setPage, admin }) {
  const numPages = Math.ceil(total / limit); // 총 표시해야 할 페이지 수

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
      </nav>
    </div>
  );
}

export default RankPagination;
