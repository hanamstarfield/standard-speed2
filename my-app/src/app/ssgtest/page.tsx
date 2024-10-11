import axios from "axios";
import React from "react";

const SsgPage = async () => {
  const { data: post } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts/10"
  );

  return (
    <div>
      <p>제목 : {post.title}</p>
      <p>내용 : {post.body}</p>
    </div>
  );
};

export default SsgPage;
