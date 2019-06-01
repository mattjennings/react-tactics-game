import { PixiComponent } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'
import React from 'react'

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
  const tilemap = new PIXI.extras.TiledMap(props.tilemapUrl)

  return <PixiTilemap tilemap={tilemap} />
}

export default Tilemap
