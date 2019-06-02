import { Text } from '@inlet/react-pixi'
import React, { useEffect } from 'react'
import Player from '../Player'
import Tilemap from '../Tilemap'
import LoadResources from '../LoadResources'
import Camera from '../Camera'
import ps from 'pixi-sound'

export default function Level1() {
  useEffect(() => {
    const sound = ps.sound.Sound.from('assets/rpg-pack/soundtrack/Windless Slopes.mp3')
    sound.play({ loop: true })

    return () => sound.stop()
  }, [])

  return (
    <LoadResources
      resources={['/assets/tilemaps/level1.tmx', '/assets/rpg-pack/chars/gabe/gabe-idle-run.png']}
      fallback={<Text text="Loading..." style={{ fill: 'white' }} x={0} y={0} />}
    >
      <Camera x={256} y={256}>
        <Tilemap tilemapUrl="/assets/tilemaps/level1.tmx">
          <Player startingPosition={{ x: 250, y: 250 }} />
        </Tilemap>
      </Camera>
    </LoadResources>
  )
}
