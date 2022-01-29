/* eslint-disable no-lonely-if */
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useEffect } from 'react'
import { Row, Col, Button, Menu, Layout } from 'antd'
import styles from 'styles/layout.module.scss'
import { useRouter } from 'next/router'

export const siteTitle = 'Pokedex'

interface PageDescription {
  title?: string | ReactNode
  description?: string | ReactNode
}

interface Props {
  children?: ReactNode
  pageDescription?: PageDescription
}

function PageLayout({ children, pageDescription }: Props) {
  let prevScrollpos = null
  const router = useRouter()
  const selectedKeys = [router ? router.asPath : '/']

  const initLayoutAnimation = () => {
    prevScrollpos = window.pageYOffset
    const mobileNavbar = document.getElementById('mobile-navbar')
    const navbar = document.getElementById('navbar')
    const parallax = document.getElementById('pokedex-bg')
    window.onscroll = () => {
      const scrollValue = window.scrollY
      const currentScrollPos = window.pageYOffset
      if (prevScrollpos > currentScrollPos) {
        if (mobileNavbar) mobileNavbar.style.bottom = '0px'
        if (navbar) navbar.style.top = '0px'
      } else {
        // eslint-disable-next-line prettier/prettier
        if (mobileNavbar) mobileNavbar.style.bottom = '-100px'
        if (navbar && currentScrollPos > 50) navbar.style.top = '-64px'
      }
      prevScrollpos = currentScrollPos
      parallax.style.top = `${scrollValue * 0.5}px`
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initLayoutAnimation()
    }
  }, [])

  return (
    <Layout>
      <div id="navbar" className="navbar">
        <Layout.Header>
          <div className="logo" style={{ float: 'left', margin: '6px 20px' }}>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/pokemon.png"
                  height={50}
                  width={50}
                  alt="pokemon.png"
                />
              </a>
            </Link>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[]}
            selectedKeys={selectedKeys}
          >
            <Menu.Item key="/">
              <Link href="/">
                <a>
                  <div>Pokemon List</div>
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="/my-pokemon">
              <Link href="/my-pokemon">
                <a>
                  <div>My Pokemon</div>
                </a>
              </Link>
            </Menu.Item>
          </Menu>
        </Layout.Header>
      </div>
      <div className="parallax-container">
        <div className="parallax">
          <img
            src="/images/pokedex-bg.jpeg"
            id="pokedex-bg"
            className="pokedex-bg"
            style={{ transform: 'translate3d(0px, 0px, 0px)', opacity: 1 }}
            alt="parallax.jpg"
          />
          <div className="parallax-content">
            {pageDescription && (
              <div>
                <h1 className="text-2xl text-center">
                  {pageDescription.title}
                </h1>
                <p className="text-center">{pageDescription.description}</p>
              </div>
            )}
            <div className="gradient" />
          </div>
        </div>
      </div>
      <div className="container">
        <Head>
          <link rel="icon" href="/pokemon.ico" />
          <meta
            name="description"
            content="A Pokemon Wikipedia and mini game using Next.js, Typescript, Apollo client, React Context."
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle,
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header className="header">
          <Link href="/">
            <a>
              <Image
                priority
                src="/images/pokemon.png"
                height={108}
                width={108}
                alt="pokemon.png"
              />
            </a>
          </Link>
        </header>
        <main className={styles.mainWrapper}>{children}</main>
        <div id="mobile-navbar" className={styles.mobileNavbar}>
          <Row justify="space-between">
            <Col span={12}>
              <Link href="/">
                <a>
                  <Button
                    style={{
                      backgroundColor: 'rgba(17, 17, 17, 0.9) !important',
                    }}
                    type="text"
                  >
                    <Image
                      src="/images/poke-list.png"
                      width="50px"
                      height="50px"
                      alt="poke-list.png"
                    />
                  </Button>
                </a>
              </Link>
            </Col>
            <Col span={12}>
              <Link href="/my-pokemon">
                <a>
                  <Button
                    style={{
                      backgroundColor: 'rgba(17, 17, 17, 0.9) !important',
                    }}
                    type="text"
                  >
                    <Image
                      src="/images/my-poke.png"
                      width="50px"
                      height="50px"
                      alt="poke-list.png"
                    />
                  </Button>
                </a>
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  )
}

export default PageLayout

PageLayout.defaultProps = {
  children: null,
  pageDescription: null,
}
