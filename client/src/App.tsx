import { Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';

function App() {
    return (
        <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
    );
}

export default App;
