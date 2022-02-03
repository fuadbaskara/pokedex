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
import { v4 as uuidv4 } from 'uuid'
import { PokemonContext } from 'context'
import { useRouter } from 'next/router'
import PokemonCard from 'components/common/pokemon-card'
import Link from 'next/link'
import CommonField from 'components/common/common-field'
import { Stats } from 'components/stats'
import Moves from 'components/moves'
import Types from 'components/types'
import SkeletonCard from 'components/common/skeleton-card'
import Head from 'next/head'
import Table from 'components/common/table'
import { Pokemon } from 'gql/models'

export default function PokemonDetail() {
  const router = useRouter()
  const { name, nickname } = router.query
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
  const [isCatching, setIsCathing] = useState(false)
  const [pokemonCathced, setPokemonCatched] = useState(false)
  const [newNickname, setNickname] = useState('')
  const [pokemonDetail, setPokemonDetail] = useState(null)

  const releaseThisPokemon = (myPokemonId: string) => {
    Modal.confirm({
      title: `Are you sure want to release ${
        nickname || 'this pokemon'
      } to the wild?`,
      onOk: () => {
        releasePokemon(myPokemonId)
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
      (pokemon) => pokemon.name === name && pokemon.nickname === nickname,
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
    const gotcha = Math.random() > 0.5
    setIsCathing(true)
    setTimeout(() => {
      if (gotcha) {
        setVisible(true)
      } else {
        Modal.error({
          title: `Oh Noes! ${pokemonDetail.name} has escaped :(`,
          content: (
            <p>{`${pokemonDetail.name} has run away! you might be scared it too much, No problem be gentle next time and try again`}</p>
          ),
        })
      }
      setIsCathing(false)
    }, 1000)
  }

  const savePokemon = () => {
    form.validateFields().then(async (values: any) => {
      const pokemonInfo = {
        ...data.pokemon,
        nickname: values.nickname,
        my_pokemon_id: uuidv4(),
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

  const additionalInfo = (pokemonDetail: Pokemon) => (
    <>
      <Divider />
      <Table>
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
      </Table>
    </>
  )

  const pageDescription = {
    title: 'Pokemon Details',
    description: `Here is all the info we have for this Pokemon`,
  }

  return (
    <Layout pageDescription={pageDescription}>
      <Head>
        <title>Pokemon Detail</title>
      </Head>
      <div id="pokemon-detail" style={{ paddingBottom: '120px' }}>
        {pokemonDetail && (
          <>
            <Row justify="center">
              <Col xs={24} sm={24} md={12}>
                <PokemonCard
                  pokemons={pokemons}
                  pokemon={pokemonDetail}
                  additionalInfo={() => additionalInfo(pokemonDetail)}
                />
                <div id="pokemon-detail-actions" className="m-4">
                  <Row justify="center" gutter={16}>
                    {!nickname && (
                      <>
                        <Col span={24}>
                          <Button
                            block
                            loading={isCatching}
                            type="primary"
                            onClick={catchThisPokemon}
                          >
                            {`${isCatching ? 'Attempt to Catch...' : 'Catch!'}`}
                          </Button>
                        </Col>
                        {pokemonCathced && (newNickname || nickname) && (
                          <Col span={24}>
                            <Link
                              href={`/detail/${pokemonDetail.name}?nickname=${
                                newNickname || nickname
                              }`}
                            >
                              <a>
                                <Button block className="mt-2" type="primary">
                                  View This Pokemon
                                </Button>
                              </a>
                            </Link>
                          </Col>
                        )}
                      </>
                    )}
                    {nickname && (
                      <Col span={24}>
                        <Button
                          block
                          className=""
                          type="primary"
                          onClick={() =>
                            releaseThisPokemon(pokemonDetail.my_pokemon_id)
                          }
                        >
                          RELEASE
                        </Button>
                      </Col>
                    )}
                  </Row>
                </div>
              </Col>
            </Row>
            <div>
              <Row justify="center">
                <Col xs={24} sm={24} md={12}>
                  <Tabs defaultActiveKey="1" type="card" animated>
                    <Tabs.TabPane tab="Stats" key="1">
                      {Stats(pokemonDetail)}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Types" key="2">
                      {Types(pokemonDetail)}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Moves" key="3">
                      {Moves(pokemonDetail)}
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
        <div className="catched-pokemon-notice pt-4 pb-4">
          <h2 className="text-center text-4xl">
            &#127882; Congratulations! &#127882;
          </h2>
          <p className="text-center">{`"You Have just Caught ${name}"`}</p>
        </div>
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item
            label="Give your pokemon a nickname"
            name="nickname"
            rules={[
              {
                required: true,
                message: 'You must give your new pokemon a nickname',
              },
              () => ({
                validator(_, value) {
                  const myPokemon = localStorage.getItem('pokemons')
                    ? JSON.parse(localStorage.getItem('pokemons'))
                    : []
                  const isNicknameUsed = (myPokemon || []).filter(
                    (pokemon) =>
                      pokemon.name?.toLowerCase().trim() ===
                        pokemonDetail.name?.toLowerCase().trim() &&
                      pokemon.nickname?.toLowerCase().trim() ===
                        value?.toLowerCase().trim(),
                  )
                  if (isNicknameUsed[0]) {
                    return Promise.reject(
                      new Error(
                        `you have a same pokemon with the name ${value} already, please choose another nickname! (case insensitive)`,
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
