import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      content
      comments {
        id
        text
      }
    }
  }
`;
