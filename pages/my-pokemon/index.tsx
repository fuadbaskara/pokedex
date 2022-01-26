import Link from 'next/link'
import { Card, Button, Row, Col } from 'antd'
import Image from 'next/image'
import { useContext } from 'react'
import Layout from 'components/layout'
import { PokemonContext } from 'context'

function PokemonList() {
  const { pokemons } = useContext(PokemonContext)

  return (
    <Layout>
      <Row justify="center">
        {(pokemons || []).map((pokemon: any, idx: number) => (
          <Col key={idx} xs={24} sm={24} md={8}>
            <Card>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                width="100%"
                height="100%"
                alt={`${pokemon.name} image`}
              />
              <p style={{ textTransform: 'capitalize' }}>{pokemon.name}</p>
              <p style={{ textTransform: 'capitalize' }}>{pokemon.nickname}</p>
              <Link
                href={`detail/${pokemon.name}?nickname=${pokemon.nickname}`}
              >
                <Button className="" type="primary">
                  DETAILS
                </Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Layout>
  )
}

export default PokemonList
