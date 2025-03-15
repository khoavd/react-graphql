export const STAR_REPO = `
mutation ($repoId: ID!) {
  addStar(input: {starrableId: $repoId}) {
    starrable {
      stargazers {
        totalCount
      }
    }
  }
}
`;
