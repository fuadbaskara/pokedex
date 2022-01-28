import { Card, Button, Row, Col } from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import { ReactNode } from 'react'

interface Props {
  pokemons: any[]
  pokemon: any
  col?: number
  actions: ReactNode[]
}

const cardStyle = {
  boxShadow:
    '0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%)',
  margin: '10px',
  backgroundColor: '#424242',
  border: '1px solid #424242',
}

const rawUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

function PokemonCard({ pokemons, pokemon, col, actions }: Props) {
  return (
    <Card style={cardStyle}>
      <Row justify="center">
        <Col span={col}>
          <div className="flex justify-center">
            <Image
              src={pokemon.id ? rawUrl(pokemon.id) : pokemon.image}
              width="100%"
              height="100%"
              alt={`${pokemon.name} image`}
            />
          </div>
        </Col>
        <Col span={col}>
          <div className="flex justify-center">
            <p style={{ textTransform: 'capitalize' }}>{pokemon.name}</p>
          </div>
          {pokemon.nickname && (
            <p style={{ textTransform: 'capitalize', textAlign: 'center' }}>
              {pokemon.nickname}
            </p>
          )}
          <div className="flex justify-center">
            <p>{`Owned (${
              (pokemons || []).filter(
                (pokemonInfo) => pokemonInfo.name === pokemon.name,
              ).length
            })`}</p>
          </div>
        </Col>
      </Row>
      <Row justify="center">
        {actions.map((item, key) => (
          <Col key={key} span={col}>
            {item}
          </Col>
        ))}
      </Row>
    </Card>
  )
}

PokemonCard.defaultProps = {
  col: 24,
}

export default PokemonCard
