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
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Link to="/" className="text-blue-500">
                Back to Posts
            </Link>
            <h2 className="text-2xl font-bold mb-2 mt-4">{post.title}</h2>
            <p className="mb-4">{post.content}</p>

            {/* Comment Form */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Add a Comment</h3>
                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        className="border p-2 w-full mb-2"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        required
                        rows={4}
                    ></textarea>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Submit Comment
                    </button>
                </form>
            </div>

            {/* Comments List */}
            <h3 className="text-xl font-semibold mb-2">Comments</h3>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="border p-2 mb-2 flex justify-between items-center"
                    >
                        <p>{comment.text}</p>
                        <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    );
};

export default PostDetail;
