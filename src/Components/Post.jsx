import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export const Post = () => {
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const API = `https://jsonplaceholder.typicode.com`;

  const api = axios.create({
    baseURL: API,
  });

  const getPosts = async () => {
    try {
      const { data } = await api.get("/posts");

      setPosts(data);
    } catch (error) {}
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    const searchResult = posts.filter((post) => post.title.includes(value));
    setPosts(searchResult);
  };


  
  //   const Card = (props) => {
  //     const { body, id, title } = props;
  //     console.log(body);

  //   };

  return (
    <>
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="search"
        value={searchInput}
        placeholder="Search"
        onChange={(e) => handleSearch(e)}
      />

      <ul>
        {posts.map((post) => {
          return (
            <div key={post.id} className="card">
              <li>
                <span>Id: {post.id}</span>
                <h1>Title: {post.title}</h1>
                <p>Body: {post.body}</p>
              </li>
            </div>
          );
        })}
      </ul>
    </>
  );
};
