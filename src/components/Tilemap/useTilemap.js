import { useContext } from 'react'
import { TilemapContext } from './Tilemap'

export default function useTilemap() {
  return useContext(TilemapContext)
}
