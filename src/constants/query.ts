import { gql } from '@apollo/client';

export const ENDPOINT = import.meta.env.VITE_API_URL;
export const TOKEN = import.meta.env.VITE_API_TOKEN;

export const GET_VIEWER_QUERY = gql`
  query {
    viewer {
      name
      avatarUrl
    }
  }
`;

export const GET_REPO = gql`
  query GetRepo($org: String!, $repo: String!) {
    repository(owner: $org, name: $repo) {
      id
      name
      description
      viewerHasStarred
      stargazers {
        totalCount
      }
    }
  }
`;
