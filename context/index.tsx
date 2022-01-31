/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect, ReactNode } from 'react'

type PokemonContextType = {
  pokemons: any[]
  catchPokemon: (catchedPokemon: any) => void
  releasePokemon: (name: string, nickname: string) => void
}

interface Props {
  children: ReactNode
}

export const PokemonContext = createContext<PokemonContextType>(null)

function PokemonProvider({ children }: Props) {
  const [pokemons, setPokemons] = useState([])

  const releasePokemon = (name: string, nickname: string) => {
    const newPokemonList = pokemons.filter((pokemon: any) => {
      return (
        pokemon.name !== name &&
        (pokemon.nickname !== nickname || pokemon.nickname === nickname)
      )
    })
    localStorage.setItem('pokemons', JSON.stringify(newPokemonList))
    setPokemons(newPokemonList)
  }

  const catchPokemon = (catchedPokemon: any) => {
    const newPokemonList = [...pokemons, ...[catchedPokemon]]
    localStorage.setItem('pokemons', JSON.stringify(newPokemonList))
    setPokemons(newPokemonList)
  }

  const value = { pokemons, catchPokemon, releasePokemon }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cachedPokemons = JSON.parse(localStorage.getItem('pokemons'))
      setPokemons(
        cachedPokemons && Array.isArray(cachedPokemons) ? cachedPokemons : [],
      )
    }
  }, [])

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  )
}

export default PokemonProvider

export const PokemonConsumer = PokemonContext.Consumer
