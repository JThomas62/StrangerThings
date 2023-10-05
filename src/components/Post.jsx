import { useEffect, useState } from "react";
import { fetchPosts } from "./index";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetchPosts();
        if (result && result.data) {
          setPosts(result.data.posts);
        } else {
          console.error("Invalid response format from the API");
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const makePost = async () => {
    try {
      const response = await fetch("https://strangers-things.herokuapp.com/api/2306-FTB-ET-WEB-PT/posts", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          post: {
            title: title,
            description: description,
            price: price,
            location: location,
            willDeliver: willDeliver
          }
        })
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setTitle("");
        setDescription("");
        setPrice("");
        setLocation("");
        setWillDeliver(false);
      } else {
        console.error("Failed to create the post");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Post</h1>
      <h2>Create New Post</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          makePost();
        }}
      >
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          Will Deliver:
          <input
            type="checkbox"
            checked={willDeliver}
            onChange={(e) => setWillDeliver(e.target.checked)}
          />
        </label>
        <button type="submit">Create Post</button>
      </form>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
}
