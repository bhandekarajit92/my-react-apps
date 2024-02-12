// src/App.js
import React, { useState, useEffect } from "react";
// import api from "./services/api";
// import Posts from "./components/Posts";

function Todo() {
 const [posts, setPosts] = useState([]);

 useEffect(() => {
    api.get("/posts").then((response) => {
      setPosts(response.data);
    });
 }, []);

 return (
    <div className="App">
      <h1>Json Api Crud</h1>
      <Posts posts={posts} />
    </div>
 );
}

export default Todo;
