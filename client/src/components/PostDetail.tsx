import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Post, Comment } from '../types';
import { useParams, Link } from 'react-router-dom';

const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await axios.get<Post>(`http://localhost:3000/posts/${id}`);
            setPost(response.data);
        };

        const fetchComments = async () => {
            const response = await axios.get<Comment[]>(`http://localhost:3000/posts/${id}/comments`);
            setComments(response.data);
        };

        fetchPost();
        fetchComments();
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Link to="/" className="text-blue-500">Back to Posts</Link>
            <h2 className="text-2xl font-bold mb-2 mt-4">{post.title}</h2>
            <p className="mb-4">{post.content}</p>
            <h3 className="text-xl font-semibold mb-2">Comments</h3>
            {comments.map((comment) => (
                <div key={comment.id} className="border p-2 mb-2">
                    <p>{comment.text}</p>
                </div>
            ))}
        </div>
    );
};

export default PostDetail;
