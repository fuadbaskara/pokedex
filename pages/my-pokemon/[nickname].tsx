import { Card, Button, Modal, notification } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { PokemonContext } from 'context'
import { useRouter } from 'next/router'
import Layout from 'components/layout'
import Image from 'next/image'

interface Props {
  nickname: string
}

export default function Post({ nickname }: Props) {
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${myPokemonDetail.id}.png`}
            width="100%"
            height="100%"
            alt={`${myPokemonDetail.name} image`}
          />
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
