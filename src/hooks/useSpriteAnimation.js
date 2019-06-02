import { useState, useEffect } from 'react'
import { useTick } from '@inlet/react-pixi'

/**
 * Animates an array of sprites and returns the active sprite and frame
 * @param {{ sprites: any[]; fps: number; startingFrame?: number; loopFrame?: number }}
 * @returns {[sprite, frame, setFrame]}
 */
export default function useSpriteAnimation({ sprites, fps, startingFrame = 0, loopFrame = 0 }) {
  const [frame, setFrame] = useState(startingFrame)

  useEffect(() => {
    setFrame(0)
  }, [sprites])

  useTick(delta => {
    if (!fps) {
      return
    }

    let nextFrame = (frame + delta * fps) % (sprites.length + loopFrame)

    if (nextFrame >= sprites.length) {
      nextFrame = loopFrame
    }

    if (nextFrame !== frame) {
      setFrame(nextFrame)
    }
  })

  return [sprites[Math.floor(frame)], frame, setFrame]
}
