import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Post } from '../types';

interface PostFormProps {
    postToEdit?: Post | null;
    onSuccess: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ postToEdit, onSuccess }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (postToEdit) {
            setTitle(postToEdit.title);
            setContent(postToEdit.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [postToEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (postToEdit) {
            await axios.put(`http://localhost:3000/posts/${postToEdit.id}`, {
                title,
                content,
            });
        } else {
            await axios.post('http://localhost:3000/posts', {
                title,
                content,
            });
        }

        setTitle('');
        setContent('');
        onSuccess();
    };

    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">
                {postToEdit ? 'Edit Post' : 'Create New Post'}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label className="block font-semibold">Title</label>
                    <input
                        type="text"
                        className="border p-2 w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block font-semibold">Content</label>
                    <textarea
                        className="border p-2 w-full"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    {postToEdit ? 'Update Post' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default PostForm;
