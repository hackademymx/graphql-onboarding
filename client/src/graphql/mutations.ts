import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $text: String!) {
    createComment(postId: $postId, text: $text) {
      id
      text
      postId
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id)
  }
`;
