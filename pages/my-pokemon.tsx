import Link from 'next/link'
import { Button, Row, Col } from 'antd'
import { useContext } from 'react'
import Layout from 'components/layout'
import { PokemonContext } from 'context'
import PokemonCard from 'components/common/pokemon-card'

function PokemonList() {
  const { pokemons } = useContext(PokemonContext)

  return (
    <Layout>
      <div style={{ paddingBottom: '120px' }}>
        <Row justify="center">
          {(pokemons || []).map((pokemon: any, idx: number) => (
            <Col key={idx} xs={24} sm={24} md={8}>
              <PokemonCard
                pokemons={pokemons}
                pokemon={pokemon}
                actions={[
                  <div className="flex justify-center" key="my-pokemon-detail">
                    <Link
                      href={`/detail/${pokemon.name}?nickname=${pokemon.nickname}`}
                    >
                      <a>
                        <Button className="" type="primary">
                          DETAILS
                        </Button>
                      </a>
                    </Link>
                  </div>,
                ]}
              />
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  )
}

export default PokemonList
