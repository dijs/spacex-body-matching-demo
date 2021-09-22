import '../styles/globals.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink as apolloCreateHttpLink,
} from '@apollo/client'
import { createHttpLink } from '@layer0/apollo'

function MyApp({ Component, pageProps }) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({ uri: '/graphql' }, apolloCreateHttpLink),
  })
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
