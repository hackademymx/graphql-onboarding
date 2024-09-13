import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await axios.post('http://localhost:3000/posts', {
            title,
            content,
        });

        // Redirect to the home page after creation
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 bg-pattern">
            <div className="max-w-3xl mx-auto py-8 px-4">
                <Link to="/" className="text-blue-500 hover:underline">
                    &larr; Back to Posts
                </Link>
                <div className="bg-white shadow-md rounded-lg p-6 mt-4">
                    <h2 className="text-3xl font-bold mb-6">Create New Post</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                placeholder="Enter the post title"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
                                Content
                            </label>
                            <textarea
                                id="content"
                                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                rows={6}
                                placeholder="Write your post content here..."
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white flex items-center px-6 py-2 rounded-lg transform transition duration-200 hover:-translate-y-1 active:translate-y-0.5 hover:bg-blue-600 active:bg-blue-700"
                        >
                            <span className="h-5 w-5 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </span>
                            Publish Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
