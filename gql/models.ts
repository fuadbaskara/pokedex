/* eslint-disable camelcase */
export interface BaseName {
  id: number
  url: string
  name: string
}

export interface Pokemons {
  count: number
  next: string
  previous: string
  results: PokemonItem[]
  status: boolean
  message: string
}

export interface PokemonItem {
  id: number
  url: string
  name: string
  image: string
  artwork: string
  dreamworld: string
}

export interface Pokemon extends PokemonItem {
  abilities: Ability[]
  base_experience: number
  forms: BaseName[]
  height: number
  held_items?: HeldItem[]
  id: number
  image: string
  is_default: boolean
  location_area_encounters: string
  moves: Move[]
  name: string
  nickname?: string
  my_pokemon_id?: string
  order: number
  species: BaseName
  sprites: Sprite
  stats: Stat[]
  types: Type[]
  weight: number
  status: boolean
  message: string
}

export interface Ability {
  ability: BaseName
  is_hidden: boolean
  slot: number
}

export interface Move {
  move: BaseName
}

export interface Stat {
  base_stat: number
  effort: number
  stat: BaseName
}

export interface Type {
  slot: number
  type: BaseName
}

export interface Sprite {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
}

export interface HeldItem {
  item: BaseName
  version_details: VersionDetail[]
}

export interface VersionDetail {
  rarity: number
  version: BaseName
}
