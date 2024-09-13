import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Post, Comment } from '../types';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

interface PostDetailProps {
    post: Post;
    onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
    const [comments, setComments] = useState<Comment[]>([]);

    const fetchComments = async () => {
        const response = await axios.get<Comment[]>(
            `http://localhost:3000/posts/${post.id}/comments`
        );
        setComments(response.data);
    };

    useEffect(() => {
        fetchComments();
    }, [post]);

    return (
        <div>
            <button
                onClick={onBack}
                className="bg-gray-500 text-white px-2 py-1 mb-4"
            >
                Back
            </button>
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="mb-4">{post.content}</p>
            <CommentForm postId={post.id} onSuccess={fetchComments} />
            <CommentList comments={comments} refreshComments={fetchComments} />
        </div>
    );
};

export default PostDetail;
