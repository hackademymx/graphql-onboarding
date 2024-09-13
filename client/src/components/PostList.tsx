import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from '../types';

interface PostListProps {
    onSelectPost: (post: Post) => void;
    onEditPost: (post: Post) => void;
}

const PostList: React.FC<PostListProps> = ({ onSelectPost, onEditPost }) => {
    const [posts, setPosts] = useState<Post[]>([]);

    const fetchPosts = async () => {
        const response = await axios.get<Post[]>('http://localhost:3000/posts');
        setPosts(response.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: number) => {
        await axios.delete(`http://localhost:3000/posts/${id}`);
        fetchPosts();
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Posts</h2>
            {posts.map((post) => (
                <div key={post.id} className="border p-4 mb-4">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <p>{post.content}</p>
                    <div className="mt-2">
                        <button
                            onClick={() => onSelectPost(post)}
                            className="bg-blue-500 text-white px-2 py-1 mr-2"
                        >
                            View
                        </button>
                        <button
                            onClick={() => onEditPost(post)}
                            className="bg-green-500 text-white px-2 py-1 mr-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(post.id)}
                            className="bg-red-500 text-white px-2 py-1"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostList;
