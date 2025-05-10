import React from "react";
import "./Title.css";

const Title = ({ SubTitle, Title }) => {
  return (
    <div className="container">
      <div className="title">
        <p>{SubTitle}</p>
        <h2>{Title}</h2>
      </div>
    </div>
  );
};

export default Title;
