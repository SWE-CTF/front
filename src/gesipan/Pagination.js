import styled from "styled-components";
import { Link } from "react-router-dom";

function Pagination({ total, limit, page, setPage }) {
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
        <div className="Write">
          <Link to="/Edit">
            <button>글쓰기</button>
          </Link>
        </div>
      </nav>
    </div>
  );
}

// const Nav = styled.nav`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 4px;
//   margin: 16px;
// `;

// const Button = styled.button`
//   border: none;
//   border-radius: 8px;
//   padding: 8px;
//   margin: 0;
//   background: black;
//   color: white;
//   font-size: 1rem;

//   &:hover {
//     background: tomato;
//     cursor: pointer;
//     transform: translateY(-2px);
//   }

//   &[disabled] {
//     background: grey;
//     cursor: revert;
//     transform: revert;
//   }

//   &[aria-current] {
//     background: green;
//     font-weight: bold;
//     cursor: revert;
//     transform: revert;
//   }
// `;

export default Pagination;
