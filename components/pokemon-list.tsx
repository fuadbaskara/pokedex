import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_POKEMONS } from 'gql/queries'
import { Card, Button, Row, Col } from 'antd'
import Image from 'next/image'
import { useRef, useEffect, useContext } from 'react'
import { PokemonContext } from 'context'
import PokemonCard from './common/pokemon-card'
import SkeletonCard from './common/skeleton-card'

function PokemonList() {
  let offset = 1
  const { loading, fetchMore, data } = useQuery(GET_POKEMONS, {
    variables: {
      offset: 1,
      limit: 12,
    },
  })
  const { pokemons } = useContext(PokemonContext)
  const scrollRef = useRef(null)

  const handleMore = () => {
    offset += 12
    fetchMore({
      variables: {
        offset: offset + 12,
        limit: 12,
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
    // const onIntersection = (entries) =>
    //   entries[0].isIntersecting && !loading && handleMore()
    // const observer = new IntersectionObserver(onIntersection, { threshold: 1 })
    // observer.observe(scrollRef.current)
  }, [loading])

  return (
    <>
      <Row justify="center">
        {(data?.pokemons?.results || []).map((pokemon: any, idx: number) => (
          <Col key={idx} xs={24} sm={24} md={8}>
            <PokemonCard
              pokemons={pokemons}
              pokemon={pokemon}
              actions={[
                <Link key="pokemon-detail" href={`/detail/${pokemon.name}`}>
                  <a>
                    <div className="flex justify-center">
                      <Button className="" type="primary">
                        DETAILS
                      </Button>
                    </div>
                  </a>
                </Link>,
              ]}
            />
          </Col>
        ))}
      </Row>
      <Row justify="center">
        <Col xs={24} sm={24} md={8}>
          <SkeletonCard />
        </Col>
      </Row>
      <div className="infinite-scroll" ref={scrollRef} />
    </>
  )
}

export default PokemonList
