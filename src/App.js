import { Stage, Text } from '@inlet/react-pixi'
import React, { Suspense } from 'react'
import Player from './components/Player'
import Tilemap from './components/Tilemap'
import LoadResources from './components/LoadResources'

const App = () => (
  <Stage id="stage" width={512} height={512} options={{}}>
    <LoadResources
      resources={['/assets/tilemaps/level1.tmx', '/assets/rpg-pack/chars/gabe/gabe-idle-run.png']}
      fallback={<Text text="Loading..." style={{ fill: 'white' }} x={0} y={0} />}
    >
      <Tilemap tilemapUrl="/assets/tilemaps/level1.tmx" />
      <Player startingPosition={{ x: 250, y: 250 }} />
    </LoadResources>
  </Stage>
)

export default App
