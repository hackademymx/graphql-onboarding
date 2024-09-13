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

                        {/* Comments List */}
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
                                            className="text-red-500 hover:text-red-700 ml-4 transform hover:scale-110 transition duration-200"
                                            title="Delete Comment"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>

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
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg transform transition duration-200 hover:-translate-y-1 active:translate-y-0.5 hover:bg-blue-600 active:bg-blue-700"
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
