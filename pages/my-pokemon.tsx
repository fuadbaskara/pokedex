/* eslint-disable import/no-extraneous-dependencies */
import Link from 'next/link'
import { Button, Row, Col, Modal, notification } from 'antd'
import { useContext } from 'react'
import Layout from 'components/layout'
import { PokemonContext } from 'context'
import PokemonCard from 'components/common/pokemon-card'
import { ArrowLeftOutlined } from '@ant-design/icons'
import Head from 'next/head'
import { useRouter } from 'next/router'

function PokemonList() {
  const router = useRouter()
  const { pokemons, releasePokemon } = useContext(PokemonContext)

  const releaseThisPokemon = (nickname: string) => {
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
      },
      onCancel: () => {},
    })
  }

  const pageDescription = {
    title: 'My Pokemon',
    description: 'These are all the Pokemons you have catched so far.',
  }

  return (
    <Layout pageDescription={pageDescription}>
      <Head>
        <title>My Pokemon</title>
      </Head>
      <div style={{ paddingBottom: '120px' }}>
        <Row justify="center">
          {(pokemons || []).map((pokemon: any, idx: number) => (
            <Col key={idx} xs={24} sm={24} md={10}>
              <PokemonCard
                pokemons={pokemons}
                pokemon={pokemon}
                onClick={() =>
                  router.push(
                    `/detail/${pokemon.name}?nickname=${pokemon.nickname}`,
                  )
                }
                actions={[
                  <div className="flex justify-center" key="my-pokemon-detail">
                    <Link
                      href={`/detail/${pokemon.name}?nickname=${pokemon.nickname}`}
                    >
                      <a>
                        <Button className="mr-2" type="primary">
                          DETAILS
                        </Button>
                      </a>
                    </Link>
                  </div>,
                  <div key="release-pokemon" className="flex justify-center">
                    <Button
                      className="ml-2"
                      type="primary"
                      onClick={() => releaseThisPokemon(pokemon.nickname)}
                    >
                      RELEASE
                    </Button>
                  </div>,
                ]}
              />
            </Col>
          ))}
        </Row>
        {!pokemons[0] && (
          <div className="flex justify-center">
            <div>
              <div className="empty-img-wrapper">
                <Link href="/">
                  <a>
                    <img
                      className="empty-img"
                      src="/images/who-pokemon.jpeg"
                      alt="who-pokemon.jpeg"
                    />
                  </a>
                </Link>
              </div>
              <div className="mt-4 mb-4">
                <h2 className="text-center">
                  Whoops! seems like you have nothing here.
                </h2>
                <p className="text-center">
                  Hmm.. Seems like you haven&apos;t catch anything, or you have
                  released all your catched pokemon. ¯\_(ツ)_/¯
                </p>
              </div>
              <div className="flex justify-center">
                <Link href="/">
                  <a>
                    <Button
                      icon={<ArrowLeftOutlined />}
                      type="text"
                      className="back-btn"
                    >
                      Go back Catch Some Pokemon
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default PokemonList
