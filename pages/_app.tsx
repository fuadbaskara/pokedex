import 'styles/global.scss'
import 'antd/dist/antd.css'
import { ApolloProvider } from '@apollo/client'
import { client } from 'gql'
import PokemonProvider from 'context'
import { ReactNode } from 'react'

interface Props {
  Component: any
  pageProps: any
}

const App = ({ Component, pageProps }: Props) => {
  return (
    <PokemonProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </PokemonProvider>
  )
}

export default App
