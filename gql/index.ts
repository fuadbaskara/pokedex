import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { API_URL } from 'config/env'

const defaultOptions = {}

export const client = new ApolloClient({
  cache: new InMemoryCache({}),
  defaultOptions,
  link: new HttpLink({
    uri: `${API_URL}`,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
})
