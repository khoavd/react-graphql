import { STAR_REPO } from '../constants/mutation';
import { ENDPOINT, TOKEN } from '../constants/query';

export async function starRepo(repoId: string) {
  const response = await fetch(ENDPOINT!, {
    body: JSON.stringify({ query: STAR_REPO, variables: { repoId } }),
    headers: { 'Content-Type': 'application/json', Authorization: `bearer ${TOKEN}` },
    method: 'POST',
  });

  await response.json();
}
