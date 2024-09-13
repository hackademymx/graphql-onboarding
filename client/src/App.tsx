import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';

function App() {
    return (
        <div className="container mx-auto p-4">
            <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/posts/:id" element={<PostDetail />} />
            </Routes>
        </div>
    );
}

export default App;
