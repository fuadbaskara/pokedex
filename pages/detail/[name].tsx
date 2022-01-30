/* eslint-disable no-new */
import Layout from 'components/layout'
import { useQuery } from '@apollo/client'
import { GET_POKEMON_DETAIL } from 'gql/queries'
import {
  Button,
  Modal,
  Input,
  Form,
  notification,
  Row,
  Col,
  Tabs,
  Divider,
} from 'antd'
import { useContext, useState, useEffect } from 'react'
import { PokemonContext } from 'context'
import { useRouter } from 'next/router'
import PokemonCard from 'components/common/pokemon-card'
import Link from 'next/link'
import CommonField from 'components/common/common-field'
import { Stats } from 'components/stats'
import Moves from 'components/moves'
import Types from 'components/types'
import SkeletonCard from 'components/common/skeleton-card'

interface Props {
  name: string
  nickname: string
}

export default function PokemonDetail({ name, nickname }: Props) {
  const router = useRouter()
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const { loading, data } = useQuery(GET_POKEMON_DETAIL, {
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
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
    } else {
      Modal.error({
        title: `Oh Noes! ${pokemonDetail.name} has escaped :(`,
        content: (
          <p>{`${pokemonDetail.name} has run away! you might be scared it too much, No problem be gentle next time and try again`}</p>
        ),
      })
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

  const additionalInfo = (pokemonDetail: any) => (
    <>
      <Divider />
      <CommonField
        fieldName="Species"
        fieldValue={pokemonDetail.species.name}
      />
      <CommonField fieldName="ID" fieldValue={pokemonDetail.id} />
      <CommonField fieldName="Height" fieldValue={pokemonDetail.height} />
      <CommonField fieldName="Weight" fieldValue={pokemonDetail.weight} />
      <CommonField
        fieldName="Base Exp."
        fieldValue={pokemonDetail.base_experience}
      />
    </>
  )

  const pageDescription = {
    title: 'Pokemon Detail',
    description: `Here is all the info we have for this Pokemon`,
  }

  return (
    <Layout pageDescription={pageDescription}>
      <div id="pokemon-detail" style={{ paddingBottom: '120px' }}>
        {pokemonDetail && (
          <>
            <Row justify="center">
              <Col xs={24} sm={24} md={12}>
                <PokemonCard
                  pokemons={pokemons}
                  pokemon={pokemonDetail}
                  additionalInfo={() => additionalInfo(pokemonDetail)}
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
                        {pokemonCathced && (newNickname || nickname) && (
                          <Link
                            href={`/detail/${newNickname}?nickname=${
                              newNickname || nickname
                            }`}
                          >
                            <a>
                              <Button className="" type="primary">
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
            <div>
              <Row justify="center">
                <Col xs={24} sm={24} md={12}>
                  <Tabs defaultActiveKey="1" type="card" animated>
                    <Tabs.TabPane tab="Stats" key="1">
                      {pokemonDetail && Stats(pokemonDetail)}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Types" key="2">
                      {pokemonDetail && Types(pokemonDetail)}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Moves" key="3">
                      {pokemonDetail && Moves(pokemonDetail)}
                    </Tabs.TabPane>
                  </Tabs>
                </Col>
              </Row>
            </div>
          </>
        )}
        {!pokemonDetail && (
          <div className="md-skeleton w-full">
            <Row justify="center">
              <Col xs={24} sm={24} md={12}>
                <SkeletonCard />
              </Col>
            </Row>
            <Row justify="center">
              <Col xs={24} sm={24} md={12}>
                <Divider />
              </Col>
            </Row>
            <Row justify="center">
              <Col xs={24} sm={24} md={12}>
                <SkeletonCard />
              </Col>
            </Row>
          </div>
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
              () => ({
                validator(_, value) {
                  const myPokemon = localStorage.getItem('pokemons')
                    ? JSON.parse(localStorage.getItem('pokemons'))
                    : []
                  const isNicknameUsed = (myPokemon || []).filter(
                    (pokemon) =>
                      pokemon.name === pokemonDetail.name &&
                      pokemon.nickname === value,
                  )
                  if (isNicknameUsed[0]) {
                    return Promise.reject(
                      new Error(
                        `you have a same pokemon with the name ${value} already, please choose another nickname!`,
                      ),
                    )
                  }
                  return Promise.resolve()
                },
              }),
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
