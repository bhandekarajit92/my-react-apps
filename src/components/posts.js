// src/components/Posts.js
import React, { useState } from "react";
import api from "../services/Api";
import Post from "./Post";

function Posts({ posts }) {
 const [postContent, setPostContent] = useState("");

 const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await api.post("/posts", {
      title: postContent,
      body: postContent,
      userId: 1,
    });

    setPosts([...posts, response.data]));
    setPostContent("");
 };

 return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter post title"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <button type="submit">Add Post</button>
      </form>
      <ul>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </div>
 );
}
export default Posts;