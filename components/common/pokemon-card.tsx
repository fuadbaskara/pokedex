/* eslint-disable import/no-extraneous-dependencies */
import { Card, Row, Col, Divider, Tag } from 'antd'
import Image from 'next/image'
import { ReactNode } from 'react'
import { UpOutlined } from '@ant-design/icons'
import { Pokemon } from 'gql/models'
import { v4 as uuidv4 } from 'uuid'
import Table from './table'
import CommonField from './common-field'

interface Props {
  pokemons: Pokemon[]
  pokemon: Pokemon
  col?: number
  actions?: ReactNode[]
  additionalInfo?: () => ReactNode | ReactNode
  onClick?: () => void
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
  onClick,
}: Props) {
  return (
    <div id="pokemon-card">
      <Card style={{ ...cardStyle }}>
        <div className="card-inner-containers">
          <div
            className="pokemon-info"
            style={{ cursor: `${onClick ? 'pointer' : 'auto'}` }}
            onClick={onClick}
          >
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
                  {pokemon.types && (
                    <Row justify="center" className="mb-2">
                      <Col>
                        {pokemon.types.map((type) => (
                          <Tag
                            className={`type-tag color--${type.type.name}`}
                            key={uuidv4()}
                          >
                            {type.type.name}
                          </Tag>
                        ))}
                      </Col>
                    </Row>
                  )}
                  <Table>
                    <CommonField fieldName="Name" fieldValue={pokemon.name} />
                    {pokemon.nickname && (
                      <CommonField
                        fieldName="Nickname"
                        fieldValue={pokemon.nickname}
                        className="pl-2"
                        style={{ textAlign: 'end' }}
                      />
                    )}
                  </Table>
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
          {actions && actions[0] && (
            <div className="relative mobile-actions">
              <div className="open-mobile-actions w-full">
                <UpOutlined />
              </div>
            </div>
          )}
          {actions && actions[0] && (
            <div
              id="action-containers"
              className="action-containers flex justify-center items-center"
            >
              <Row justify="center">
                {(actions || [])
                  .filter((item) => item)
                  .map((item, key) => (
                    <Col key={key}>{item}</Col>
                  ))}
              </Row>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

PokemonCard.defaultProps = {
  col: 24,
  additionalInfo: null,
  actions: [],
  onClick: null,
}

export default PokemonCard
