import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');

if (container) {
    // Create a root.
    const root = ReactDOM.createRoot(container);

    // Initial render
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    );
} else {
    console.error('Failed to find the root element. Ensure there is an element with id="root" in your index.html.');
}
