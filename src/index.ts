import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { posts, comments, Post, Comment } from "./data";

const app = express();
app.use(bodyParser.json());

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

// Start the REST server
app.listen(3000, () => console.log("REST API running on port 3000"));
