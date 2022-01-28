import Head from 'next/head'
import React from 'react'
import PokemonList from 'components/pokemon-list'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.scss'

export default function Home() {
  const pageDescription = {
    title: 'Pokedex',
    description:
      'Welcome to Pokedex, we have all the pokemons in existence and you can catch them here and add them to your collection. Let`s go catch some pokemons!',
  }

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
