import { PixiComponent } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'
import React, { useMemo, useCallback } from 'react'
import getCollisionBounds from '../../util/getCollisionBounds'

export const TilemapContext = React.createContext({ tilemap: null })

const PixiTilemap = PixiComponent('Tilemap', {
  create: props => {
    return props.tilemap
  },
  applyProps: (tilemap, _, props) => {
    // noop
  }
})

const Tilemap = props => {
  // create tilemap from url
  const tilemap = useMemo(() => new PIXI.extras.TiledMap(props.tilemapUrl), [props.tilemapUrl])

  // Create a Map of collision enabled tiles with keys of "x, y"
  const collisionTiles = useMemo(() => {
    const layers = tilemap.layers.filter(layer => layer.properties.collision)
    const tiles = new Map()
    layers.forEach(layer => {
      layer.tiles.filter(tile => tile.tile).map(tile => tiles.set(`${tile.x}, ${tile.y}`, tile))
    })

    return tiles
  }, [tilemap])

  const getCollisionTile = useCallback(
    ({ x, y }) => {
      const { tileWidth, tileHeight } = tilemap

      const snappedX = Math.floor(x / tileWidth) * tileWidth
      const snappedY = Math.floor(y / tileHeight) * tileHeight

      return collisionTiles.get(`${snappedX}, ${snappedY}`)
    },
    [collisionTiles, tilemap]
  )

  const checkMove = useCallback(
    (from, to, bounds) => {
      const { pivot = [0, 0] } = bounds
      const isMovingX = from.x - to.x !== 0
      const isMovingY = from.y - to.y !== 0
      const nextCollisionBounds = getCollisionBounds(to, bounds)
      const fromCollisionBounds = getCollisionBounds(from, bounds)

      let nextX = from.x
      let nextY = from.y

      if (isMovingX) {
        const isMovingLeft = from.x - to.x > 0 ? true : false
        const xEdge = isMovingLeft ? nextCollisionBounds.left : nextCollisionBounds.right
        const midY = (fromCollisionBounds.top + fromCollisionBounds.bottom) / 2

        const collidingTile =
          getCollisionTile({
            x: xEdge,
            y: fromCollisionBounds.bottom
          }) ||
          getCollisionTile({
            x: xEdge,
            y: fromCollisionBounds.top
          }) ||
          getCollisionTile({
            x: xEdge,
            y: midY
          })

        if (!collidingTile) {
          nextX = to.x
        } else {
          nextX = collidingTile.x + (isMovingLeft ? collidingTile.width + 1 + pivot[0] : -1 - pivot[0])
        }
      }

      if (isMovingY) {
        const isMovingUp = from.y - to.y > 0 ? true : false
        const yEdge = isMovingUp ? nextCollisionBounds.top : nextCollisionBounds.bottom
        const midX = (fromCollisionBounds.left + fromCollisionBounds.right) / 2

        const collidingTile =
          getCollisionTile({
            x: fromCollisionBounds.left,
            y: yEdge
          }) ||
          getCollisionTile({
            x: fromCollisionBounds.right,
            y: yEdge
          }) ||
          getCollisionTile({
            x: midX,
            y: yEdge
          })

        if (!collidingTile) {
          nextY = to.y
        } else {
          nextY = collidingTile.y + (isMovingUp ? collidingTile.height + 1 + pivot[1] : -1 - pivot[1])
        }
      }

      return {
        x: nextX,
        y: nextY
      }
    },
    [getCollisionTile]
  )

  const value = useMemo(
    () => ({
      tilemap,
      getCollisionTile,
      checkMove
    }),
    [tilemap, getCollisionTile, checkMove]
  )

  return (
    <TilemapContext.Provider value={value}>
      <PixiTilemap {...props} tilemap={tilemap} />
    </TilemapContext.Provider>
  )
}

export default Tilemap
