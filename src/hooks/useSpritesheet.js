import { useState, useEffect } from 'react'
import * as PIXI from 'pixi.js'

export default function useSpritesheet({ spritesheet, fps, frame, frameWidth, frameHeight }) {
  const [sprites, setSprites] = useState(getSprites({ spritesheet, frameWidth, frameHeight }))

  useEffect(() => {
    setSprites(getSprites({ spritesheet, frameWidth, frameHeight }))
  }, [spritesheet, frameWidth, frameHeight])

  return sprites
}

function getSprites({ spritesheet, frameWidth, frameHeight }) {
  const { baseTexture, width, height } = PIXI.utils.TextureCache[spritesheet]

  const frames = []
  for (let y = 0; y < height / frameHeight; y += frameHeight) {
    for (let x = 0; x < width; x += frameWidth) {
      frames.push(new PIXI.Texture(baseTexture, new PIXI.Rectangle(x, y, frameWidth, frameHeight)))
    }
  }

  return frames
}
