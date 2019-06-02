import { PixiComponent, Container } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'
import React, { useMemo, useCallback, useEffect } from 'react'
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

const Tilemap = ({ children, tilemapUrl, ...props }) => {
  // create tilemap from url
  const tilemap = useMemo(() => new PIXI.extras.TiledMap(tilemapUrl), [tilemapUrl])

  // Put the rendered children next to the REACT_CHILDREN layer in the tilemap
  useEffect(() => {
    const reactChildrenLayerIndex = tilemap.children.findIndex(child => child.name === 'REACT_CHILDREN')
    const renderLayerIndex = tilemap.children.findIndex(child => child.name === 'RENDER')

    arrayMove(tilemap.children, renderLayerIndex, reactChildrenLayerIndex)
  }, [tilemap])

  // Create a Map of collision enabled tiles with keys of "x, y"
  const collisionTiles = useMemo(() => {
    const { layers } = tilemap
    const tiles = new Map()
    layers.forEach((layer, index) => {
      if (layer.tiles) {
        layer.tiles
          .filter(tile => tile.tile && (layer.properties.collision || tile.properties.collision))
          .map(tile => tiles.set(`${tile.x}, ${tile.y}`, tile))
      }
    })

    return tiles
  }, [tilemap])

  /**
   * Check if a tile with enabled collision exists at the given point
   */
  const getCollisionTile = useCallback(
    ({ x, y }) => {
      const { tileWidth, tileHeight } = tilemap

      const snappedX = Math.floor(x / tileWidth) * tileWidth
      const snappedY = Math.floor(y / tileHeight) * tileHeight

      return collisionTiles.get(`${snappedX}, ${snappedY}`)
    },
    [collisionTiles, tilemap]
  )

  /**
   * Attempts to move to the position if there is no tile with collision enabled.
   * If there is, it will return the closest available position to that tile.
   */
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
      <PixiTilemap {...props} tilemap={tilemap}>
        <Container name="RENDER">{children}</Container>
      </PixiTilemap>
    </TilemapContext.Provider>
  )
}

function arrayMove(arr, fromIndex, toIndex) {
  var element = arr[fromIndex]
  arr.splice(fromIndex, 1)
  arr.splice(toIndex, 0, element)
}

export default Tilemap
