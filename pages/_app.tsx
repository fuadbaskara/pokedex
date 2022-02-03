import 'antd/dist/antd.css'
import 'styles/global.scss'
import { ApolloProvider } from '@apollo/client'
import { client } from 'gql'
import PokemonProvider from 'context'

interface Props {
  Component: any
  pageProps: any
}

function App({ Component, pageProps }: Props) {
  return (
    <PokemonProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </PokemonProvider>
  )
}

export default App
