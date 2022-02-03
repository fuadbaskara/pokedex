/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { Pokemon } from 'gql/models'

type PokemonContextType = {
  pokemons: Pokemon[]
  catchPokemon: (catchedPokemon: Pokemon) => void
  releasePokemon: (myPokemonId: string) => void
}

interface Props {
  children: ReactNode
}

export const PokemonContext = createContext<PokemonContextType>(null)

function PokemonProvider({ children }: Props) {
  const [pokemons, setPokemons] = useState([])

  const releasePokemon = (myPokemonId: string) => {
    const newPokemonList = pokemons.filter((pokemon: Pokemon) => {
      return pokemon.my_pokemon_id !== myPokemonId
    })
    localStorage.setItem('pokemons', JSON.stringify(newPokemonList))
    setPokemons(newPokemonList)
  }

  const catchPokemon = (catchedPokemon: Pokemon) => {
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
