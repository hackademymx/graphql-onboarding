import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { gql } from "graphql-tag";
import { posts, comments, type Post, type Comment } from "./data";

// Define the GraphQL schema using the gql function
const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    postId: ID!
    text: String!
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, content: String!): Post!
    deletePost(id: ID!): Boolean!

    createComment(postId: ID!, text: String!): Comment!
    deleteComment(id: ID!): Boolean!
  }
`;

// Define the resolvers
const resolvers = {
	Query: {
		posts: (): Post[] => posts,
		post: (_: any, args: { id: string }): Post | undefined =>
			posts.find((p) => p.id === parseInt(args.id)),
	},
	Mutation: {
		createPost: (_: any, args: { title: string; content: string }): Post => {
			const newPost: Post = {
				id: posts.length + 1,
				title: args.title,
				content: args.content,
			};
			posts.push(newPost);
			return newPost;
		},
		deletePost: (_: any, args: { id: string }): boolean => {
			const postId = parseInt(args.id);
			const index = posts.findIndex((p) => p.id === postId);
			if (index === -1) return false;
			posts.splice(index, 1);
			return true;
		},
		createComment: (
			_: any,
			args: { postId: string; text: string },
		): Comment => {
			const postId = parseInt(args.postId);
			// Check if the post exists
			const postExists = posts.some((p) => p.id === postId);
			if (!postExists) throw new Error("Post not found");

			const newComment: Comment = {
				id: comments.length + 1,
				postId: postId,
				text: args.text,
			};
			comments.push(newComment);
			return newComment;
		},
		deleteComment: (_: any, args: { id: string }): boolean => {
			const commentId = parseInt(args.id);
			const index = comments.findIndex((c) => c.id === commentId);
			if (index === -1) return false;
			comments.splice(index, 1);
			return true;
		},
	},
	Post: {
		comments: (parent: Post): Comment[] =>
			comments.filter((c) => c.postId === parent.id),
	},
};

// Create the Apollo Server instance
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

// Start the server
const startServer = async () => {
	const { url } = await startStandaloneServer(server, {
		listen: { port: 3000 },
	});
	console.log(`GraphQL server running at ${url}`);
};

startServer();
