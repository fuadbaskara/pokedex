import Layout from '../../components/layout'
import { Card, Button, Modal, notification } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { PokemonContext } from 'context'
import { useRouter } from 'next/router'

export default function Post({ nickname }) {
  const router = useRouter()
  const { pokemons, releasePokemon } = useContext(PokemonContext)
  const [myPokemonDetail, setPokemonDetail] = useState(null)

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
    setDetail()
  }, [setDetail])

  return (
    <Layout>
      {myPokemonDetail && (
        <Card>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${myPokemonDetail.id}.png`}
            alt={`${myPokemonDetail.name} image`}
          ></img>
          <p style={{ textTransform: 'capitalize' }}>{myPokemonDetail.name}</p>
          <p style={{ textTransform: 'capitalize' }}>
            {myPokemonDetail.nickname}
          </p>
          <Button className="" type="primary" onClick={releaseThisPokemon}>
            RELEASE
          </Button>
        </Card>
      )}
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  const { nickname } = context.query
  return {
    props: {
      nickname,
    },
  }
}
