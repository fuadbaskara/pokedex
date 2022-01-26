import { gql } from '@apollo/client'

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`

export const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      abilities {
        ability {
          id
          url
          name
        }
      }
      base_experience
      forms {
        id
        url
        name
      }
      height
      id
      is_default
      location_area_encounters
      moves {
        move {
          id
          url
          name
        }
      }
      name
      order
      species {
        id
        url
        name
      }
      sprites {
        back_default
        back_female
        back_shiny
        back_shiny_female
        front_default
        front_female
        front_shiny
        front_shiny_female
      }
      stats {
        base_stat
        effort
        stat {
          id
          url
          name
        }
      }
      types {
        slot
        type {
          id
          url
          name
        }
      }
      weight
      status
      message
    }
  }
`
