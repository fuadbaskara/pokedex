import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_POKEMONS } from 'gql/queries'
import { Card, Button, Row, Col } from 'antd'
import Image from 'next/image'
import { useState, useRef, useEffect, useContext } from 'react'
import { PokemonContext } from 'context'

const PokemonList = () => {
  let offset = 1
  const { loading, fetchMore, data } = useQuery(GET_POKEMONS, {
    variables: {
      offset: 1,
      limit: 10,
    },
  })
  const { pokemons } = useContext(PokemonContext)
  const scrollRef = useRef(null)

  const handleMore = () => {
    offset += 10
    fetchMore({
      variables: {
        offset: offset + 10,
        limit: 10,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prevResult
        }
        return {
          ...prevResult,
          pokemons: {
            ...fetchMoreResult.pokemons,
            results: [
              ...prevResult.pokemons.results,
              ...fetchMoreResult.pokemons.results,
            ],
          },
        }
      },
    })
  }

  useEffect(() => {
    const onIntersection = (entries) =>
      entries[0].isIntersecting && !loading && handleMore()
    const observer = new IntersectionObserver(onIntersection, { threshold: 1 })
    observer.observe(scrollRef.current)
  }, [loading])

  return (
    <>
      <Row justify="center">
        {(data?.pokemons?.results || []).map((pokemon: any, idx: number) => (
          <Col key={idx} xs={24} sm={24} md={8}>
            <Card>
              <Image
                src={pokemon.image}
                width="100%"
                height="100%"
                alt={`${pokemon.name} image`}
              />
              <p style={{ textTransform: 'capitalize' }}>{pokemon.name}</p>
              <span>{`Owned (${
                (pokemons || []).filter(
                  (pokemonInfo) => pokemonInfo.name === pokemon.name,
                ).length
              })`}</span>
              <Link href={`detail/${pokemon.name}`}>
                <Button className="" type="primary">
                  DETAILS
                </Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="infinite-scroll" ref={scrollRef} />
    </>
  )
}

export default PokemonList
