export type Post = {
	id: number;
	title: string;
	content: string;
};

export type Comment = {
	id: number;
	postId: number;
	text: string;
};

export const posts: Post[] = [
	{
		id: 1,
		title: "First Post",
		content: "This is the content of the first post.",
	},
	{
		id: 2,
		title: "Second Post",
		content: "This is the content of the second post.",
	},
	{
		id: 3,
		title: "Third Post",
		content: "This is the content of the third post.",
	},
];

export const comments: Comment[] = [
	// Comments for Post 1
	{ id: 1, postId: 1, text: "First comment on first post." },
	{ id: 2, postId: 1, text: "Second comment on first post." },
	{ id: 3, postId: 1, text: "Third comment on first post." },
	// Comments for Post 2
	{ id: 4, postId: 2, text: "First comment on second post." },
	{ id: 5, postId: 2, text: "Second comment on second post." },
	{ id: 6, postId: 2, text: "Third comment on second post." },
	// Comments for Post 3
	{ id: 7, postId: 3, text: "First comment on third post." },
	{ id: 8, postId: 3, text: "Second comment on third post." },
	{ id: 9, postId: 3, text: "Third comment on third post." },
];
