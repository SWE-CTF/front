import React from "react";
import { Link } from "react-router-dom";


const Posts = ({ posts,loading }) => {
    return (
        <>
            {loading && <div> loading... </div>}
            <ul>
                {posts.map((post) => (
                <li className="linkList" key={post.challengeId}> {/* key 속성 추가 */}
                    <Link className={`linkList ${JSON.parse(localStorage.getItem("theme"))["dark"] ? "dark" : "light"}`} to={`/pages/${post.id}`}>
                    {post.title}
                    </Link>
                </li>
                ))}
            </ul>
        </>
    );
};

export default Posts;
