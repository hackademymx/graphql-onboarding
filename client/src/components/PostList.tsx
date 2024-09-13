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
        <div className="min-h-screen bg-gray-50 bg-pattern">
            <div className="max-w-2xl mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Blog Posts</h2>
                    <button
                        onClick={() => navigate('/create')}
                        className="bg-blue-500 text-white flex items-center px-4 py-2 rounded-lg transform transition duration-200 hover:-translate-y-1 active:translate-y-0.5 hover:bg-blue-600 active:bg-blue-700"
                    >
                        <span className="h-5 w-5 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                        </span>
                        New Post
                    </button>
                </div>
                {posts.length > 0 ? (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center hover:bg-gray-100 transition duration-200"
                            >
                                <Link to={`/posts/${post.id}`} className="flex-1">
                                    <h3 className="text-2xl text-gray-800 hover:text-blue-500 transition duration-200">
                                        {post.title}
                                    </h3>
                                </Link>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="text-red-500 hover:text-red-700 ml-4 transform hover:scale-110 transition duration-200"
                                    title="Delete Post"
                                >
                                    <span className="h-6 w-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>

                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No posts available. Create a new post to get started!</p>
                )}
            </div>
        </div>
    );
};

export default PostList;
