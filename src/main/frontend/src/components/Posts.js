import React from "react";
import { Link } from "react-router-dom";
import useDarkMode from "../theme/useDarkMode"; //useDarkMode hook 추가


const Posts = ({ posts,loading }) => {
    const [theme, toggleTheme] = useDarkMode();
    return (
        <>
            {loading && <div> loading... </div>}
            <ul>
                {posts.map((post) => (
                <li className="linkList" key={post.id}> {/* key 속성 추가 */}
                    <Link className={`linkList ${theme.dark ? "dark" : "light"}`} to={`/pages/${post.id}`}>
                    {post.title}
                    </Link>
                </li>
                ))}
            </ul>
        </>
    );
};

export default Posts;