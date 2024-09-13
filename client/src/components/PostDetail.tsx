// src/components/PostDetail.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Post, Comment } from '../types';
import { useParams, Link } from 'react-router-dom';

const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentText, setCommentText] = useState('');

    const fetchPost = async () => {
        const response = await axios.get<Post>(`http://localhost:3000/posts/${id}`);
        setPost(response.data);
    };

    const fetchComments = async () => {
        const response = await axios.get<Comment[]>(
            `http://localhost:3000/posts/${id}/comments`
        );
        setComments(response.data);
    };

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [id]);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await axios.post(`http://localhost:3000/posts/${id}/comments`, {
            text: commentText,
        });

        setCommentText('');
        fetchComments();
    };

    const handleDeleteComment = async (commentId: number) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            await axios.delete(`http://localhost:3000/comments/${commentId}`);
            fetchComments(); // Refresh comments after deletion
        }
    };

    if (!post) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 bg-pattern">
            <div className="max-w-3xl mx-auto py-8 px-4">
                <Link to="/" className="text-blue-500 hover:underline">
                    &larr; Back to Posts
                </Link>
                <div className="bg-white shadow-md rounded-lg p-6 mt-4">
                    <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{post.content}</p>

                    {/* Comments Section */}
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold mb-4">Comments</h3>

                        {comments.length > 0 ? (
                            <div className="space-y-4">
                                {comments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="bg-gray-100 p-4 rounded-lg flex justify-between items-start"
                                    >
                                        <p className="text-gray-800">{comment.text}</p>
                                        <button
                                            onClick={() => handleDeleteComment(comment.id)}
                                            className="text-red-500 hover:text-red-700 ml-4"
                                            title="Delete Comment"
                                        >
                                            &#x2716;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">No comments yet.</p>
                        )}

                        {/* Comment Form */}
                        <form onSubmit={handleCommentSubmit} className="mt-6">
                            <textarea
                                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                required
                                rows={4}
                                placeholder="Write your comment here..."
                            ></textarea>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                            >
                                Submit Comment
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
