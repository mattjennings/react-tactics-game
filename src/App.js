import { Stage, Text } from '@inlet/react-pixi'
import React from 'react'
import Player from './components/Player'
import Tilemap from './components/Tilemap'
import LoadResources from './components/LoadResources'
import Camera from './components/Camera'

const App = () => (
  <Stage id="stage" width={400} height={256} options={{}}>
    <LoadResources
      resources={['/assets/tilemaps/level1.tmx', '/assets/rpg-pack/chars/gabe/gabe-idle-run.png']}
      fallback={<Text text="Loading..." style={{ fill: 'white' }} x={0} y={0} />}
    >
      <Camera x={256} y={256}>
        <Tilemap tilemapUrl="/assets/tilemaps/level1.tmx" />
        <Player startingPosition={{ x: 250, y: 250 }} />
      </Camera>
    </LoadResources>
  </Stage>
)

export default App
