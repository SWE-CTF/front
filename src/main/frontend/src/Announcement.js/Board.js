import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Board = ({ noticeId, title, contents, createdBy }) => {
  const [text, setText] = useState("");

  return (
    <div className="Board">
      <div className="info">
        <h2>title : {title}</h2>
      </div>
      <p className="content">{contents}</p>
    </div>
  );
};

export default Board;
