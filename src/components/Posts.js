import { use } from "react";
import { useState,useEffect } from "react";
import { useUserContext } from "../utils/AppContext";

export default function Posts() {
    //get both user and setNewUser from the context
    const { user, setUser } = useUserContext();
    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(json => {
                setPosts(json);
            });
    }

    useEffect(() => {
        fetchPosts();
    }, []); // Pass an empty array to only call the function once on mount.

    return (
        <div>
            <h1>Posts</h1>
            <h2>Welcome, {user}!</h2>
            <p>
                {posts.map(item => (
                    <div key={item.id}>
                        <h2>{item.title}</h2>
                        <p>{item.body}</p>
                    </div>
                ))}
            </p>
        </div>
    );
}