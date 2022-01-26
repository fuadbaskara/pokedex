import Layout from 'components/layout'
import { useQuery } from '@apollo/client'
import { GET_POKEMON_DETAIL } from 'gql/queries'
import { Card, Button, Modal, Input, Form, notification } from 'antd'
import { useContext, useState, useEffect } from 'react'
import { PokemonContext } from 'context'
import { useRouter } from 'next/router'
import Image from 'next/image'

interface Props {
  name: string
  nickname: string
}

export default function Post({ name, nickname }: Props) {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const { loading, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: {
      name,
    },
  })
  const { pokemons, catchPokemon, releasePokemon } = useContext(PokemonContext)
  const router = useRouter()
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
      catchPokemon(pokemonInfo)

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
      {pokemonDetail && (
        <Card>
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetail.id}.png`}
            width="100%"
            height="100%"
            alt={`${pokemonDetail.name} image`}
          />
          <p style={{ textTransform: 'capitalize' }}>{pokemonDetail.name}</p>
          {nickname && (
            <p style={{ textTransform: 'capitalize' }}>
              {pokemonDetail.nickname}
            </p>
          )}
          {!nickname && (
            <Button className="" type="primary" onClick={catchThisPokemon}>
              CATCH
            </Button>
          )}
          {nickname && (
            <Button className="" type="primary" onClick={releaseThisPokemon}>
              RELEASE
            </Button>
          )}
        </Card>
      )}
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
