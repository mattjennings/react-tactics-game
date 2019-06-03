import React, { useState } from 'react'
import { useApp, useTick, Sprite } from '@inlet/react-pixi'
import useSpritesheet from '../../hooks/useSpritesheet'
import useSpriteAnimation from '../../hooks/useSpriteAnimation'
import { useCamera } from '../Camera'

export default function TileCursor() {
  const app = useApp()
  const { camera } = useCamera()
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const sprites = useSpritesheet({
    spritesheet: '/assets/ui/cursor.png',
    frameHeight: 16,
    frameWidth: 16
  })

  const [sprite] = useSpriteAnimation({ sprites, fps: 0.1 })

  useTick(() => {
    const { x, y } = app.renderer.plugins.interaction.mouse.getLocalPosition(camera.current)
    setPos({ x: Math.floor(x / 16) * 16, y: Math.floor(y / 16) * 16 })
  })

  return <Sprite x={pos.x} y={pos.y} texture={sprite} />
}
