import { useState } from 'react';
import { RepoData, SearchCriteria } from '../api/type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRepo } from '../api/getRepos';
import { starRepo } from '../api/starRepo';
import { SearchRepoForm } from './SearchRepoForm';
import { FoundRepo } from './FoundRepo';
import { StarRepoButton } from './StarRepoButton';

export function RepoPage() {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | undefined>();

  const { data } = useQuery({
    queryKey: ['repo', searchCriteria],
    queryFn: () => getRepo(searchCriteria as SearchCriteria),
    enabled: searchCriteria !== undefined,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: starRepo,
    onSuccess: () => {
      queryClient.setQueryData<RepoData>(['repo', searchCriteria], (repo) => {
        if (repo === undefined) {
          return undefined;
        }

        return {
          ...repo,
          viewerHasStarred: true,
        };
      });
    },
  });

  function handleSearch(search: SearchCriteria) {
    setSearchCriteria(search);
  }

  function handleStarClick() {
    if (data) {
      mutate(data.repository.id);
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
