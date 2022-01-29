import { Card, Row, Col, Divider } from 'antd'
import Image from 'next/image'
import { ReactNode } from 'react'

interface Props {
  pokemons: any[]
  pokemon: any
  col?: number
  actions?: ReactNode[]
  additionalInfo?: () => ReactNode | ReactNode
}

const cardStyle = {
  boxShadow:
    '0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%)',
  margin: '10px',
  backgroundColor: '#424242',
  border: '1px solid #f3c669',
  borderRadius: '8px',
  padding: 0,
}

const rawUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

function PokemonCard({
  pokemons,
  pokemon,
  col,
  actions,
  additionalInfo,
}: Props) {
  return (
    <div id="pokemon-card">
      <Card style={cardStyle}>
        <div className="card-inner-containers">
          <div className="pokemon-info">
            <Row justify="center">
              <Col span={col}>
                <div className="img-container flex justify-center">
                  <Image
                    src={pokemon.id ? rawUrl(pokemon.id) : pokemon.image}
                    width="100%"
                    height="100%"
                    alt={`${pokemon.name} image`}
                    className="img-border"
                  />
                </div>
              </Col>
              <Col span={col}>
                <div className="pokemon-description">
                  <Divider />
                  <div className="flex justify-between">
                    <p className="font-bold">Name</p>
                    <p className="capitalize text-center">{pokemon.name}</p>
                  </div>
                  {pokemon.nickname && (
                    <div className="flex justify-between">
                      <p className="font-bold">Nickname</p>
                      <p
                        className="text-center break-words"
                        style={{ maxWidth: '100px' }}
                      >
                        {pokemon.nickname}
                      </p>
                    </div>
                  )}
                  <div className="flex justify-start">
                    <small>{`Owned (${
                      (pokemons || []).filter(
                        (pokemonInfo) => pokemonInfo.name === pokemon.name,
                      ).length
                    })`}</small>
                  </div>
                  {additionalInfo && additionalInfo()}
                </div>
              </Col>
            </Row>
          </div>
          <div className="action-containers flex justify-center items-center">
            <Row justify="center">
              {(actions || [])
                .filter((item) => item)
                .map((item, key) => (
                  <Col key={key} span={12}>
                    {item}
                  </Col>
                ))}
            </Row>
          </div>
        </div>
      </Card>
    </div>
  )
}

PokemonCard.defaultProps = {
  col: 24,
  additionalInfo: null,
  actions: [],
}

export default PokemonCard
