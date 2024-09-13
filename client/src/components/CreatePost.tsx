import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block font-semibold mb-1">Title</label>
                    <input
                        type="text"
                        className="border p-2 w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold mb-1">Content</label>
                    <textarea
                        className="border p-2 w-full"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={6}
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
