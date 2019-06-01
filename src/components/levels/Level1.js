import { Text } from '@inlet/react-pixi'
import React from 'react'
import Player from '../Player'
import Tilemap from '../Tilemap'
import LoadResources from '../LoadResources'
import Camera from '../Camera'

export default function Level1() {
  return (
    <LoadResources
      resources={['/assets/tilemaps/level1.tmx', '/assets/rpg-pack/chars/gabe/gabe-idle-run.png']}
      fallback={<Text text="Loading..." style={{ fill: 'white' }} x={0} y={0} />}
    >
      <Camera x={256} y={256}>
        <Tilemap tilemapUrl="/assets/tilemaps/level1.tmx" />
        <Player startingPosition={{ x: 250, y: 250 }} />
      </Camera>
    </LoadResources>
  )
}
