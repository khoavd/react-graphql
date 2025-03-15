import { useState } from 'react';
import { RepoData, SearchCriteria } from '../api/type';
import { getRepo } from '../api/getRepos';
import { starRepo } from '../api/starRepo';
import { SearchRepoForm } from './SearchRepoForm';
import { FoundRepo } from './FoundRepo';
import { StarRepoButton } from './StarRepoButton';
import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client';
import { GET_REPO } from '../constants/query';
import { STAR_REPO } from '../constants/mutation';

export function RepoPage() {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | undefined>();

  const [getRepo, { data }] = useLazyQuery(GET_REPO);

  const queryClient = useApolloClient();

  const [starRepo] = useMutation(STAR_REPO, {
    onCompleted: () => {
      queryClient.cache.writeQuery({
        query: GET_REPO,
        data: {
          repository: {
            ...data.repository,
            viewerHasStarred: true,
          },
        },
        variables: searchCriteria,
      });
    },
  });

  function handleSearch(search: SearchCriteria) {
    getRepo({
      variables: { ...search },
    });

    setSearchCriteria(search);
  }

  function handleStarClick() {
    if (data) {
      starRepo({ variables: { repoId: data.repository.id } });

      console.log(data);
    }
  }

  return (
    <main className='max-w-xs ml-auto mr-auto'>
      <SearchRepoForm onSearch={handleSearch} />

      {data && (
        <>
          <FoundRepo
            name={data.repository.name}
            description={data.repository.description}
            starts={data.repository.stargazers.totalCount}
          />

          {!data.repository.viewerHasStarred && <StarRepoButton onClick={handleStarClick} />}
        </>
      )}
    </main>
  );
}
