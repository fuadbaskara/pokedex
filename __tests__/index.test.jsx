/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import Head from 'next/head'
import React from 'react'
import TestRenderer from 'react-test-renderer'
import { MockedProvider } from '@apollo/client/testing'
import PokemonList from '../components/pokemon-list'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.scss'
import { GET_POKEMONS } from '../gql/queries'
import PokemonProvider from '../context/index'

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}

  observe() {
    return null
  }

  disconnect() {
    return null
  }

  unobserve() {
    return null
  }
}

const mocks = [
  {
    request: {
      query: GET_POKEMONS,
      variables: {
        offset: 1,
        limit: 12,
      },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first',
    },
    result: {
      data: {
        pokemons: {
          count: 1118,
          next: 'https://pokeapi.co/api/v2/pokemon/?offset=13&limit=12',
          previous: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1',
          status: true,
          message: '',
          results: [
            {
              url: 'https://pokeapi.co/api/v2/pokemon/2/',
              name: 'ivysaur',
              image:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
            },
            {
              url: 'https://pokeapi.co/api/v2/pokemon/3/',
              name: 'venusaur',
              image:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
            },
            {
              url: 'https://pokeapi.co/api/v2/pokemon/4/',
              name: 'charmander',
              image:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
            },
            {
              url: 'https://pokeapi.co/api/v2/pokemon/5/',
              name: 'charmeleon',
              image:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',
            },
            {
              url: 'https://pokeapi.co/api/v2/pokemon/6/',
              name: 'charizard',
              image:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
            },
            {
              url: 'https://pokeapi.co/api/v2/pokemon/7/',
              name: 'squirtle',
              image:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
            },
            {
              url: 'https://pokeapi.co/api/v2/pokemon/8/',
              name: 'wartortle',
              image:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png',
            },
            {
              url: 'https://pokeapi.co/api/v2/pokemon/9/',
              name: 'blastoise',
              image:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
            },
            {
              url: 'https://pokeapi.co/api/v2/pokemon/10/',
              name: 'caterpie',
              image:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png',
            },
            {
              url: 'https://pokeapi.co/api/v2/pokemon/11/',
              name: 'metapod',
              image:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png',
            },
            {
              url: 'https://pokeapi.co/api/v2/pokemon/12/',
              name: 'butterfree',
              image:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png',
            },
            {
              url: 'https://pokeapi.co/api/v2/pokemon/13/',
              name: 'weedle',
              image:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png',
            },
          ],
        },
      },
    },
  },
]

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

const pageDescription = {
  title: 'Pokedex',
  description:
    'Welcome to Pokedex, we have all the pokemons in existence and you can catch them here and add them to your collection. Let`s go catch some pokemons!',
}

export default function Home() {
  return (
    <Layout pageDescription={pageDescription}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <PokemonList />
      </section>
    </Layout>
  )
}

describe('Test ApolloProvider and Pokemon Provider', () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PokemonProvider>
        <div>{pageDescription.description}</div>
      </PokemonProvider>
    </MockedProvider>,
  )

  const tree = component.toJSON()
  test('should contain this words', () => {
    expect(tree.children).toContain(pageDescription.description)
  })
})
