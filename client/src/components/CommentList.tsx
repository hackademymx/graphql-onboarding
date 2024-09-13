import React, { useState } from 'react';
import axios from 'axios';
import { Comment } from '../types';

interface CommentListProps {
    comments: Comment[];
    refreshComments: () => void;
}

const CommentList: React.FC<CommentListProps> = ({
    comments,
    refreshComments,
}) => {
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editText, setEditText] = useState('');

    const startEditing = (comment: Comment) => {
        setEditingCommentId(comment.id);
        setEditText(comment.text);
    };

    const cancelEditing = () => {
        setEditingCommentId(null);
        setEditText('');
    };

    const handleUpdate = async (commentId: number) => {
        await axios.put(`http://localhost:3000/comments/${commentId}`, {
            text: editText,
        });
        cancelEditing();
        refreshComments();
    };

    const handleDelete = async (commentId: number) => {
        await axios.delete(`http://localhost:3000/comments/${commentId}`);
        refreshComments();
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-2">Comments</h3>
            {comments.map((comment) => (
                <div key={comment.id} className="border p-2 mb-2">
                    {editingCommentId === comment.id ? (
                        <>
                            <textarea
                                className="border p-2 w-full mb-2"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                required
                            ></textarea>
                            <button
                                onClick={() => handleUpdate(comment.id)}
                                className="bg-green-500 text-white px-2 py-1 mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={cancelEditing}
                                className="bg-gray-500 text-white px-2 py-1"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <p>{comment.text}</p>
                            <div className="mt-2">
                                <button
                                    onClick={() => startEditing(comment)}
                                    className="bg-blue-500 text-white px-2 py-1 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(comment.id)}
                                    className="bg-red-500 text-white px-2 py-1"
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CommentList;
