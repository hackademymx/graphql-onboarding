# **Full-Stack Blog Application**

This project is a full-stack web application that demonstrates the differences between REST and GraphQL APIs in a practical way. It consists of:

- **Server**: A Node.js and TypeScript backend using Express.js, providing RESTful endpoints.
- **Client**: A React application using TypeScript and Tailwind CSS to consume the API.

---

## **Table of Contents**

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
  - [Clone the Repository](#clone-the-repository)
  - [Setup the Server](#setup-the-server)
  - [Setup the Client](#setup-the-client)
- [Running the Application](#running-the-application)
  - [Running the Server](#running-the-server)
  - [Running the Client](#running-the-client)
- [Understanding the REST Approach](#understanding-the-rest-approach)
  - [Multiple Requests Issue](#multiple-requests-issue)
  - [Data Refetching](#data-refetching)
- [Migrating to GraphQL](#migrating-to-graphql)
- [Why Migrate to GraphQL?](#why-migrate-to-graphql)
- [Contributing](#contributing)
- [License](#license)

---

## **Introduction**

This project aims to illustrate the practical differences between REST and GraphQL APIs by building a simple blog application. In the current REST implementation, the client needs to make multiple requests to fetch related data (e.g., posts and their comments), and additional requests are required to keep the data up-to-date after mutations like deletions.

In the `refactor/migrate-to-graphql` branch, we will demonstrate how to migrate this application to use GraphQL, addressing some of the limitations encountered with the REST approach.

---

## **Prerequisites**

- **Node.js** (version 14 or higher)
- **npm** (version 6 or higher)
- **Git**

---

## **Project Setup**

### **Clone the Repository**

First, clone the repository to your local machine:

```bash
git clone git@github.com:hackademymx/graphql-onboarding.git
cd graphql-onboarding
```

### **Setup the Server**

Navigate to the `server` directory and install the dependencies:

```bash
cd server
npm install
```

### **Setup the Client**

Navigate to the `client` directory and install the dependencies:

```bash
cd ../client
npm install
```

---

## **Running the Application**

### **Running the Server**

From the `server` directory, start the server:

```bash
cd server
npm start
```

This will start the server on **port 3000**.

### **Running the Client**

In a new terminal window, navigate to the `client` directory and start the client:

```bash
cd client
npm start
```

The React application will start on **port 3001**.

---

## **Understanding the REST Approach**

In the current implementation, the client interacts with the server using RESTful endpoints. The application allows users to:

- View a list of blog posts.
- View the details of a specific post along with its comments.
- Create new posts and comments.
- Delete posts and comments.

### **Multiple Requests Issue**

When viewing the details of a post (`/posts/:id`), the client needs to make **two separate requests**:

1. **Fetch Post Details**:

   ```javascript
   axios.get(`http://localhost:3000/posts/${id}`);
   ```

2. **Fetch Comments for the Post**:

   ```javascript
   axios.get(`http://localhost:3000/posts/${id}/comments`);
   ```

This pattern is common in REST APIs, where related data often requires multiple endpoints and requests. This can lead to:

- **Increased Network Overhead**: More requests mean more network traffic, which can impact performance, especially on slower connections.
- **Complex Client Logic**: The client must manage multiple asynchronous operations and handle their results.

### **Data Refetching**

After performing mutations like deleting a post or a comment, the client needs to **refetch the data** to keep the UI updated:

- **Refetch Posts**: After deleting a post, the client refetches the list of posts to reflect the change.
- **Refetch Comments**: After deleting a comment, the client refetches the comments for the post.

This approach can be inefficient because:

- **Redundant Data Fetching**: The client may retrieve data it already has, consuming unnecessary bandwidth.
- **Stale Data Risks**: There's a window where the UI might display outdated information until the refetch completes.

---

## **Migrating to GraphQL**

We will address these issues by migrating the application to use GraphQL in the `refactor/migrate-to-graphql` branch.

To switch to this branch:

```bash
git checkout -b refactor/migrate-to-graphql
```

In the GraphQL implementation, the client can fetch all the necessary data with a **single request**, and mutations can return updated data directly, eliminating the need for refetching.

---

## **Why Migrate to GraphQL?**

Migrating to GraphQL offers several benefits:

- **Single Endpoint**: All data operations are handled through one endpoint, simplifying the API structure.
- **Fetch Multiple Resources in One Request**: GraphQL allows querying nested and related data in a single request.

  - Example Query:

    ```graphql
    query {
      post(id: 1) {
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

- **Efficient Data Fetching**: Clients can request exactly the data they need, reducing over-fetching or under-fetching.

- **Improved Performance**: Fewer network requests and optimized data retrieval can lead to better performance, especially in mobile or low-bandwidth scenarios.

- **Simplified Client Logic**: Managing data fetching and state becomes more straightforward with GraphQL's predictable responses.

**Addressing Previous Issues:**

- **Multiple Requests Reduced**: By fetching posts and their comments in one query, we eliminate the need for multiple requests.

- **Eliminating Refetching**: After mutations like deletions, GraphQL can return the updated state of the data, so the client doesn't need to make additional requests to stay in sync.

---

## **Contributing**

Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.

---

## **License**

This project is open-source and available under the [MIT License](LICENSE).

---

**Feel free to explore the code, run the application, and check out the `refactor/migrate-to-graphql` branch to see the migration process and experience the benefits of using GraphQL firsthand.**
