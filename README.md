# **GraphQL vs REST: TypeScript Example Project**

This project demonstrates the migration from a RESTful API to a GraphQL API using TypeScript. It provides a hands-on experience to understand the benefits of GraphQL over REST in a practical application.

## **Table of Contents**

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Project Overview](#project-overview)
- [Setup Instructions](#setup-instructions)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Set Up TypeScript Configuration](#3-set-up-typescript-configuration)
  - [4. Implement the REST API](#4-implement-the-rest-api)
  - [5. Implement the GraphQL API](#5-implement-the-graphql-api)
  - [6. Build and Run the Project](#6-build-and-run-the-project)
- [Testing the APIs](#testing-the-apis)
  - [REST API Testing](#rest-api-testing)
  - [GraphQL API Testing](#graphql-api-testing)
- [Observations and Benefits](#observations-and-benefits)
- [Hands-On Exercises](#hands-on-exercises)
- [Conclusion](#conclusion)
- [Additional Resources](#additional-resources)

---

## **Introduction**

This project aims to help you and your team understand the fundamental differences between REST and GraphQL APIs by:

- Building a simple blogging platform API with both REST and GraphQL endpoints.
- Observing the limitations of REST and the advantages of GraphQL.
- Providing hands-on experience with TypeScript in backend development.

---

## **Prerequisites**

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **TypeScript** (installed globally)
  ```bash
  npm install -g typescript
  ```
- **Git** (for cloning the repository, or you can download the ZIP)

---

## **Project Overview**

We will build an API for a simple blogging platform where users can:

- Create and retrieve blog posts.
- Add comments to posts.
- Fetch posts along with their comments

## **Setup Instructions**

Follow these steps to set up the project on your local machine.

### **1. Clone the Repository**

First, clone the repository from GitHub (or you can create a new directory if you're not using a repository).

```bash
git clone git@github.com:hackademymx/graphql-onboarding.git
cd graphql-onboarding
```

### **2. Initialize the Project**

Initialize a new Node.js project with TypeScript support.

```bash
npm init -y
```

### **3. Install Dependencies**

#### **a. Install Runtime Dependencies**

```bash
npm install express express-graphql graphql
```

#### **b. Install Development Dependencies**

```bash
npm install --save-dev typescript @types/node @types/express @types/express-graphql nodemon ts-node
```

- **`typescript`**: Adds TypeScript support.
- **`@types/*`**: Provides TypeScript definitions for Node.js and Express.
- **`nodemon`**: Automatically restarts the server on code changes.
- **`ts-node`**: Allows running TypeScript files directly.

### **4. Set Up TypeScript Configuration**

Create a `tsconfig.json` file to configure the TypeScript compiler.

gggson
{
  "compilerOptions": {
    "target": "ES6",                          /* Specify ECMAScript target version */
    "module": "commonjs",                     /* Specify module code generation */
    "rootDir": "./src",                       /* Root directory of input files */
    "outDir": "./dist",                       /* Directory to output files */
    "esModuleInterop": true,                  /* Enables emit interoperability between CommonJS and ES Modules */
    "strict": true,                           /* Enable all strict type-checking options */
    "skipLibCheck": true                      /* Skip type checking of declaration files */
  }
}
```

### **5. Create the Project Structure**

Create the following folders and files:

```
├── src
│   ├── data.ts
│   ├── index.ts
├── package.json
├── tsconfig.json
```

### **6. Implement the REST API**

#### **a. `src/data.ts`**

This file will contain in-memory data storage.

```typescript
// src/data.ts

export interface Post {
  id: number;
  title: string;
  content: string;
}

export interface Comment {
  id: number;
  postId: number;
  text: string;
}

export const posts: Post[] = [];
export const comments: Comment[] = [];
```

#### **b. `src/index.ts`**

Set up the Express server and REST endpoints.

```typescript
// src/index.ts

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { posts, comments, Post, Comment } from './data';

const app = express();
app.use(bodyParser.json());

// Create a new post
app.post('/posts', (req: Request, res: Response) => {
  const id = posts.length + 1;
  const post: Post = { id, title: req.body.title, content: req.body.content };
  posts.push(post);
  res.status(201).json(post);
});

// Get all posts
app.get('/posts', (req: Request, res: Response) => {
  res.json(posts);
});

// Get a specific post
app.get('/posts/:id', (req: Request, res: Response) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

// Create a comment for a post
app.post('/posts/:id/comments', (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  const id = comments.length + 1;
  const comment: Comment = { id, postId, text: req.body.text };
  comments.push(comment);
  res.status(201).json(comment);
});

// Get comments for a post
app.get('/posts/:id/comments', (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  const postComments = comments.filter(c => c.postId === postId);
  res.json(postComments);
});

// Start the REST server
app.listen(3000, () => console.log('REST API running on port 3000'));
```

### **7. Implement the GraphQL API**

#### **a. Update Dependencies**

Ensure you have installed `express-graphql` and `graphql`:

```bash
npm install express-graphql graphql
npm install --save-dev @types/graphql
```

#### **b. Update `src/index.ts`**

Add GraphQL functionality to the existing Express server.

```typescript
// src/index.ts (Add the following imports at the top)

import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

// Define GraphQL schema
const schema = buildSchema(`
  type Post {
    id: ID!
    title: String!
    content: String!
    comments: [Comment]
  }

  type Comment {
    id: ID!
    postId: ID!
    text: String!
  }

  type Query {
    posts: [Post]
    post(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, content: String!): Post
    createComment(postId: ID!, text: String!): Comment
  }
`);

// Define resolvers
const root = {
  posts: () => posts,
  post: ({ id }: { id: number }) => posts.find(p => p.id === id),
  createPost: ({ title, content }: { title: string; content: string }) => {
    const id = posts.length + 1;
    const post: Post = { id, title, content };
    posts.push(post);
    return post;
  },
  createComment: ({ postId, text }: { postId: number; text: string }) => {
    const id = comments.length + 1;
    const comment: Comment = { id, postId, text };
    comments.push(comment);
    return comment;
  },
  Post: {
    comments: (parent: Post) => comments.filter(c => c.postId === parent.id),
  },
};

// Add GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL interface
}));

// Start the GraphQL server on a different port
app.listen(4000, () => console.log('GraphQL API running on port 4000'));
```

### **8. Update `package.json` Scripts**

Add scripts to simplify building and running the project.

```json
"scripts": {
  "build": "tsc",
  "start": "nodemon src/index.ts",
  "start:rest": "nodemon --watch src src/index.ts",
  "start:graphql": "nodemon --watch src src/index.ts"
},
```

### **9. Install Nodemon Configuration**

Create a `nodemon.json` file for better control over Nodemon.

```json
{
  "watch": ["src"],
  "ext": "ts",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "ts-node ./src/index.ts"
}
```

### **10. Build and Run the Project**

#### **a. Build the Project**

Although we're using `ts-node` for on-the-fly compilation, you can build the project using:

```bash
npm run build
```

This will compile TypeScript files to JavaScript in the `dist` directory.

#### **b. Run the REST API**

To run the REST API on port 3000:

```bash
npm run start:rest
```

#### **c. Run the GraphQL API**

To run the GraphQL API on port 4000:

```bash
npm run start:graphql
```

**Note:** Since both APIs are in the same `index.ts` file, running either script will start both servers unless you modify the code to conditionally start servers based on environment variables.

---

## **Testing the APIs**

### **REST API Testing**

Use a tool like **Postman** or **cURL** to interact with the REST API.

- **Create a Post**

  ```http
  POST http://localhost:3000/posts
  Content-Type: application/json

  {
    "title": "First Post",
    "content": "This is the first post."
  }
  ```

- **Get All Posts**

  ```http
  GET http://localhost:3000/posts
  ```

- **Create a Comment**

  ```http
  POST http://localhost:3000/posts/1/comments
  Content-Type: application/json

  {
    "text": "Great post!"
  }
  ```

- **Get Comments for a Post**

  ```http
  GET http://localhost:3000/posts/1/comments
  ```

### **GraphQL API Testing**

Navigate to `http://localhost:4000/graphql` to access the GraphiQL interface.

- **Create a Post**

  ```graphql
  mutation {
    createPost(title: "First Post", content: "This is the first post.") {
      id
      title
      content
    }
  }
  ```

- **Create a Comment**

  ```graphql
  mutation {
    createComment(postId: 1, text: "Great post!") {
      id
      postId
      text
    }
  }
  ```

- **Fetch Posts with Comments**

  ```graphql
  query {
    posts {
      id
      title
      content
      comments {
        id
        text
      }
    }
  }
  ```

---

## **Observations and Benefits**

- **REST Limitations:**
  - Multiple endpoints needed to fetch related data.
  - Over-fetching or under-fetching of data.
  - Increased number of network requests.

- **GraphQL Advantages:**
  - Single endpoint for all data operations.
  - Clients can specify exactly what data they need.
  - Ability to fetch nested and related data in a single request.
  - Reduced network overhead.

---

## **Hands-On Exercises**

### **1. Extend the Schema with User Profiles**

**Update the Schema in `index.ts`:**

```typescript
// Add this to your GraphQL schema definition

type User {
  id: ID!
  name: String!
  posts: [Post]
}

extend type Query {
  users: [User]
  user(id: ID!): User
}

extend type Mutation {
  createUser(name: String!): User
}
```

**Update Resolvers:**

```typescript
interface User {
  id: number;
  name: string;
}

let users: User[] = [];

const root = {
  // Existing resolvers...

  users: () => users,
  user: ({ id }: { id: number }) => users.find(u => u.id === id),
  createUser: ({ name }: { name: string }) => {
    const id = users.length + 1;
    const user: User = { id, name };
    users.push(user);
    return user;
  },
  User: {
    posts: (parent: User) => posts.filter(p => p.userId === parent.id),
  },
};
```

### **2. Implement Pagination**

**Update Schema:**

```typescript
extend type Query {
  posts(limit: Int, offset: Int): [Post]
}
```

**Update Resolver:**

```typescript
posts: ({ limit, offset }: { limit?: number; offset?: number }) => {
  const start = offset || 0;
  const end = limit ? start + limit : posts.length;
  return posts.slice(start, end);
},
```

**Example Query:**

```graphql
query {
  posts(limit: 2) {
    id
    title
  }
}
```

---

## **Conclusion**

By completing this setup and experimenting with both the REST and GraphQL APIs, you and your team will:

- Understand the practical differences between REST and GraphQL.
- Experience the advantages of GraphQL in terms of flexibility and efficiency.
- Gain hands-on experience with TypeScript in backend development.

---

## **Additional Resources**

- **GraphQL Official Website**: [https://graphql.org](https://graphql.org)
- **Express.js Documentation**: [https://expressjs.com](https://expressjs.com)
- **TypeScript Documentation**: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
- **Express-GraphQL**: [https://github.com/graphql/express-graphql](https://github.com/graphql/express-graphql)

---

**Feel free to reach out if you have any questions or need further assistance!**
