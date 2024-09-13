// src/App.tsx

import React, { useState } from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import { Post } from './types';

function App() {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [postToEdit, setPostToEdit] = useState<Post | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handlePostSelect = (post: Post) => {
        setSelectedPost(post);
    };

    const handlePostEdit = (post: Post) => {
        setPostToEdit(post);
    };

    const handleFormSuccess = () => {
        setPostToEdit(null);
        setRefreshKey((oldKey) => oldKey + 1); // To refresh the PostList
    };

    const handleBack = () => {
        setSelectedPost(null);
    };

    return (
        <div className="container mx-auto p-4">
            {selectedPost ? (
                <PostDetail post={selectedPost} onBack={handleBack} />
            ) : (
                <>
                    <PostForm postToEdit={postToEdit} onSuccess={handleFormSuccess} />
                    <PostList
                        key={refreshKey}
                        onSelectPost={handlePostSelect}
                        onEditPost={handlePostEdit}
                    />
                </>
            )}
        </div>
    );
}

export default App;
