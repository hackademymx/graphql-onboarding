import React, { useState } from 'react';
import axios from 'axios';

interface CommentFormProps {
    postId: number;
    onSuccess: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onSuccess }) => {
    const [text, setText] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await axios.post(`http://localhost:3000/posts/${postId}/comments`, {
            text,
        });

        setText('');
        onSuccess();
    };

    return (
        <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Add a Comment</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="border p-2 w-full mb-2"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                ></textarea>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    Submit Comment
                </button>
            </form>
        </div>
    );
};

export default CommentForm;
