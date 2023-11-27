import axios from "axios";
import { useEffect, useState } from "react";
import HomeButton from "../components/HomeButton";
import Nav from "../components/Nav";
import RankPagination from "../components/RankPagination";
const Rank = () => {
  const [rankList, setRankList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  useEffect(() => {
    const getInit = async () => {
      try {
        const res = await axios.get("/api/member/rank");
        if (res.status === 200) {
          const data = res.data;
          setRankList(data);

          // 정렬된 배열을 상태로 설정
          const sortedData = [...data].sort(
            (a, b) => b.questionId - a.questionId
          );
          setSortedPosts(sortedData);
          console.log(sortedData);
          console.log("rankList : " + data);
        } else {
          console.log("데이터 가져오지 못함");
        }
      } catch (e) {
        console.log(e);
      }
    };

    getInit();
  }, []);

  const [sortedPosts, setSortedPosts] = useState([]);

  return (
    <div>
      <div className="Rank">
        <HomeButton></HomeButton>
        <Nav></Nav>
        <div className="title">
          <strong>Ranking</strong>
        </div>
        <div className="list_top">
          <div className="rank">순위</div>
          <div className="nickname">닉네임</div>
          {/* <div className="challengeId">문제 번호</div> */}
          <div className="num">맞춘 갯수</div>
        </div>
        <div className="list_wrap">
          {sortedPosts.length === 0 ? (
            <h2>loading...</h2>
          ) : (
            <div className="list">
              {sortedPosts
                .slice(offset, offset + limit)
                .map(({ nickname, count }, index) => (
                  <article key={index}>
                    <div>{index + 1}</div>
                    <div>{nickname}</div>
                    <div>{count}</div>
                  </article>
                ))}
            </div>
          )}
        </div>
        <div className="page">
          <RankPagination
            total={sortedPosts.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Rank;