import Head from 'next/head'
import React from 'react'
import PokemonList from 'components/pokemon-list'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.scss'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <PokemonList />
      </section>
    </Layout>
  )
}
