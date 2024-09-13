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

export const posts: Post[] = [];
export const comments: Comment[] = [];
