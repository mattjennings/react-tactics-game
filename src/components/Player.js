import { Sprite, useTick } from '@inlet/react-pixi'
import React, { useReducer, useContext, useEffect } from 'react'
import useSpritesheet from '../hooks/useSpritesheet'
import useKey from '../hooks/useKey'
import { CameraContext } from './Camera'
import usePosition from '../hooks/usePosition'

const WALKING_SPEED = 2

const Player = ({ startingPosition }) => {
  const leftKey = useKey(65) // A
  const rightKey = useKey(68) // D
  const downKey = useKey(87) // S
  const upKey = useKey(83) // W

  const { moveCamera } = useContext(CameraContext)
  const [anim, dispatchAnim] = useReducer(reducer, {
    fps: 0,
    frame: 0,
    facing: 1
  })

  const [pos, setPos] = usePosition(startingPosition, { limitBounds: true })

  // set initial camera position
  useEffect(() => {
    moveCamera(pos)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sprites = useSpritesheet({
    spritesheet: '/assets/rpg-pack/chars/gabe/gabe-idle-run.png',
    frameWidth: 24,
    frameHeight: 24
  })

  // Handle animation updating (keep this above other useTicks)
  useTick(delta => {
    if (!anim.fps) {
      return
    }
    let nextFrame = (anim.frame + delta * anim.fps) % (sprites.length + 1)

    // loop starts on first frame
    if (nextFrame >= sprites.length) {
      nextFrame = 1
    }

    if (nextFrame !== anim.frame) {
      dispatchAnim({ type: 'UPDATE_FRAME', payload: nextFrame })
    }
  })

  // Handle controls
  useTick(delta => {
    let velocity = { x: 0, y: 0 }

    if (leftKey.isDown) {
      velocity.x -= WALKING_SPEED
    }

    if (rightKey.isDown) {
      velocity.x += WALKING_SPEED
    }

    if (upKey.isDown) {
      velocity.y += WALKING_SPEED
    }

    if (downKey.isDown) {
      velocity.y -= WALKING_SPEED
    }

    if (velocity.x || velocity.y) {
      const newPos = { x: pos.x + velocity.x, y: pos.y + velocity.y }
      const facing = velocity.x ? Math.sign(newPos.x - pos.x) : anim.facing

      setPos(newPos)
      moveCamera({ ...pos, ...newPos })
      dispatchAnim({ type: 'START_WALK', payload: { facing } })
    }

    const stoppedWalking = !leftKey.isDown && !rightKey.isDown && !upKey.isDown && !downKey.isDown
    if (stoppedWalking) {
      dispatchAnim({ type: 'IDLE' })
    }
  })

  return (
    <Sprite
      texture={sprites[Math.floor(anim.frame)]}
      x={pos.x}
      y={pos.y}
      pivot={[12, 0]}
      scale={{ x: anim.facing, y: 1 }}
    />
  )
}

function reducer(state, action) {
  switch (action.type) {
    case 'START_WALK': {
      const { facing } = action.payload
      if (isWalking(state) && state.facing === facing) {
        return state
      }

      return {
        ...state,
        fps: 0.2,
        frame: 1,
        facing
      }
    }
    case 'IDLE':
      return {
        ...state,
        fps: 0,
        frame: 0
      }
    case 'UPDATE_FRAME': {
      return { ...state, frame: action.payload }
    }
    default:
      return state
  }
}

function isWalking(animState) {
  return animState.fps !== 0
}

export default Player
