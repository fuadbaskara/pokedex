import 'styles/global.scss'
import 'antd/dist/antd.css'
import { ApolloProvider } from '@apollo/client'
import { client } from 'gql'
import PokemonProvider from 'context'

export default function App({ Component, pageProps }) {
  return (
    <PokemonProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </PokemonProvider>
  )
}
