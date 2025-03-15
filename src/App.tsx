import { Header } from './Header';
import { RepoPage } from './repoPage/RepoPage';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ENDPOINT, TOKEN } from './constants/query';

//const queryClient = new QueryClient();

const queryClient = new ApolloClient({
  uri: ENDPOINT,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `bearer ${TOKEN}`,
  },
});

function App() {
  return (
    <ApolloProvider client={queryClient}>
      <Header />
      <RepoPage />
    </ApolloProvider>
  );
}

export default App;
