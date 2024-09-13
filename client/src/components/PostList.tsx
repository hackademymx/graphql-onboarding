import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from '../types';
import { Link } from 'react-router-dom';

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get<Post[]>('http://localhost:3000/posts');
            setPosts(response.data);
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Posts</h2>
            {posts.map((post) => (
                <div key={post.id} className="border p-4 mb-4">
                    <h3 className="text-xl font-semibold">
                        <Link to={`/posts/${post.id}`} className="text-blue-500">
                            {post.title}
                        </Link>
                    </h3>
                </div>
            ))}
        </div>
    );
};

export default PostList;
