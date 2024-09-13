import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from '../types';
import { Link, useNavigate } from 'react-router-dom';

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();

    const fetchPosts = async () => {
        const response = await axios.get<Post[]>('http://localhost:3000/posts');
        setPosts(response.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            await axios.delete(`http://localhost:3000/posts/${id}`);
            fetchPosts(); // Refresh the list after deletion
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Posts</h2>
                <button
                    onClick={() => navigate('/create')}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Create New Post
                </button>
            </div>
            {posts.map((post) => (
                <div key={post.id} className="border p-4 mb-4 flex justify-between items-center">
                    <h3 className="text-xl font-semibold">
                        <Link to={`/posts/${post.id}`} className="text-blue-500">
                            {post.title}
                        </Link>
                    </h3>
                    <button
                        onClick={() => handleDelete(post.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default PostList;
