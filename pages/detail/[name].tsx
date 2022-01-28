import Layout from 'components/layout'
import { useQuery } from '@apollo/client'
import { GET_POKEMON_DETAIL } from 'gql/queries'
import { Card, Button, Modal, Input, Form, notification, Row, Col } from 'antd'
import { useContext, useState, useEffect } from 'react'
import { PokemonContext } from 'context'
import { useRouter } from 'next/router'
import Image from 'next/image'
import PokemonCard from 'components/common/pokemon-card'
import Link from 'next/link'

interface Props {
  name: string
  nickname: string
}

export default function Post({ name, nickname }: Props) {
  const router = useRouter()
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const { loading, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: {
      name,
    },
  })
  const { pokemons, catchPokemon, releasePokemon } = useContext(PokemonContext)
  const [pokemonCathced, setPokemonCatched] = useState(false)
  const [newNickname, setNickname] = useState('')
  const [pokemonDetail, setPokemonDetail] = useState(null)

  const releaseThisPokemon = () => {
    Modal.confirm({
      title: `Are you sure want to release ${
        nickname || 'this pokemon'
      } to the wild?`,
      onOk: () => {
        releasePokemon(nickname)
        notification.success({
          message: 'Pokemon Successfully Released!',
          description: `You have released ${
            nickname || 'this pokemon'
          } to the wild.`,
        })
        router.push('/my-pokemon')
      },
      onCancel: () => {},
    })
  }

  const setDetail = () => {
    const selectedPokemonDetail = pokemons.filter(
      (pokemon) => pokemon.nickname === nickname,
    )
    setPokemonDetail(selectedPokemonDetail[0])
  }

  useEffect(() => {
    if (nickname) {
      setDetail()
    }
    if (!loading && !nickname) {
      setPokemonDetail(data.pokemon)
    }
  }, [loading, data, setDetail])

  const catchThisPokemon = () => {
    if (Math.random() > 0.5) {
      setVisible(true)
    }
  }

  const savePokemon = () => {
    form.validateFields().then(async (values: any) => {
      const pokemonInfo = {
        ...data.pokemon,
        nickname: values.nickname,
      }
      setNickname(values.nickname)
      catchPokemon(pokemonInfo)
      setPokemonCatched(true)

      notification.success({
        message: 'Pokemon Successfully Captured!',
        description:
          'Your new pokemon has been successfully captured and saved',
      })
      setVisible(false)
    })
  }

  return (
    <Layout>
      <div style={{ paddingBottom: '120px' }}>
        {pokemonDetail && (
          <Row justify="center">
            <Col xs={24} sm={24} md={12}>
              <PokemonCard
                pokemons={pokemons}
                pokemon={pokemonDetail}
                actions={[
                  !nickname && (
                    <div className="flex justify-center">
                      <Button
                        className="mr-2"
                        type="primary"
                        onClick={catchThisPokemon}
                      >
                        CATCH
                      </Button>
                      {pokemonCathced && (
                        <Link
                          href={`/detail/${newNickname}?nickname=${nickname}`}
                        >
                          <a>
                            <Button
                              className=""
                              type="primary"
                              onClick={catchThisPokemon}
                            >
                              DETAIL
                            </Button>
                          </a>
                        </Link>
                      )}
                    </div>
                  ),
                  nickname && (
                    <div className="flex justify-center">
                      <Button
                        className=""
                        type="primary"
                        onClick={releaseThisPokemon}
                      >
                        RELEASE
                      </Button>
                    </div>
                  ),
                ]}
              />
            </Col>
          </Row>
        )}
      </div>
      <Modal
        destroyOnClose
        visible={visible}
        onOk={savePokemon}
        onCancel={() => setVisible(false)}
      >
        <h2>Congratulations!</h2>
        <p>{`You Have just Caught ${name}`}</p>
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item
            label="Your new pokemon Nickname"
            name="nickname"
            rules={[
              {
                required: true,
                message: 'Please give your pokemon a nickname',
              },
            ]}
          >
            <Input placeholder="Plase enter your new pokemon nickname" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  const { name, nickname } = context.query
  return {
    props: {
      name,
      nickname: nickname || null,
    },
  }
}
