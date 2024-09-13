import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { posts, comments, type Post, type Comment } from "./data";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create a new post
app.post("/posts", (req: Request, res: Response) => {
	const id = posts.length + 1;
	const post: Post = { id, title: req.body.title, content: req.body.content };
	posts.push(post);
	res.status(201).json(post);
});

// Get all posts
app.get("/posts", (req: Request, res: Response) => {
	res.json(posts);
});

// Get a specific post
app.get("/posts/:id", (req: Request, res: Response) => {
	const post = posts.find((p) => p.id === parseInt(req.params.id));
	if (!post) return res.status(404).json({ error: "Post not found" });
	res.json(post);
});

// Update a post
app.put("/posts/:id", (req: Request, res: Response) => {
	const postId = parseInt(req.params.id);
	const postIndex = posts.findIndex((p) => p.id === postId);

	if (postIndex === -1) {
		return res.status(404).json({ error: "Post not found" });
	}

	const updatedPost: Post = {
		...posts[postIndex],
		title: req.body.title ?? posts[postIndex].title,
		content: req.body.content ?? posts[postIndex].content,
	};

	posts[postIndex] = updatedPost;
	res.json(updatedPost);
});

// Delete a post
app.delete("/posts/:id", (req: Request, res: Response) => {
	const postId = parseInt(req.params.id);
	const postIndex = posts.findIndex((p) => p.id === postId);

	if (postIndex === -1) {
		return res.status(404).json({ error: "Post not found" });
	}

	posts.splice(postIndex, 1);
	res.status(204).send();
});

// Create a comment for a post
app.post("/posts/:id/comments", (req: Request, res: Response) => {
	const postId = parseInt(req.params.id);
	const post = posts.find((p) => p.id === postId);
	if (!post) return res.status(404).json({ error: "Post not found" });

	const id = comments.length + 1;
	const comment: Comment = { id, postId, text: req.body.text };
	comments.push(comment);
	res.status(201).json(comment);
});

// Get comments for a post
app.get("/posts/:id/comments", (req: Request, res: Response) => {
	const postId = parseInt(req.params.id);
	const postComments = comments.filter((c) => c.postId === postId);
	res.json(postComments);
});

// Update a comment
app.put("/comments/:id", (req: Request, res: Response) => {
	const commentId = parseInt(req.params.id);
	const commentIndex = comments.findIndex((c) => c.id === commentId);

	if (commentIndex === -1) {
		return res.status(404).json({ error: "Comment not found" });
	}

	const updatedComment: Comment = {
		...comments[commentIndex],
		text: req.body.text ?? comments[commentIndex].text,
	};

	comments[commentIndex] = updatedComment;
	res.json(updatedComment);
});

// Delete a comment
app.delete("/comments/:id", (req: Request, res: Response) => {
	const commentId = parseInt(req.params.id);
	const commentIndex = comments.findIndex((c) => c.id === commentId);

	if (commentIndex === -1) {
		return res.status(404).json({ error: "Comment not found" });
	}

	comments.splice(commentIndex, 1);
	res.status(204).send();
});

// Start Servers
app.listen(3000, () => console.log("REST API running on port 3000"));
