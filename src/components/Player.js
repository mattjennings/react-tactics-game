import { Sprite, useTick } from '@inlet/react-pixi'
import React, { useReducer } from 'react'
import useMergingState from '../hooks/useMergingState'
import useSpritesheet from '../hooks/useSpritesheet'
import Input from './Input'
import useKey from '../hooks/useKey'

const Player = ({ startingPosition }) => {
  const leftKey = useKey(65) // A
  const rightKey = useKey(68) // D
  const downKey = useKey(87) // S
  const upKey = useKey(83) // W

  const [anim, dispatchAnim] = useReducer(reducer, {
    fps: 0,
    frame: 0,
    facing: 1
  })

  const [pos, setPos] = useMergingState(startingPosition)

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
    if (leftKey.isDown) {
      walk({ x: pos.x - 2 })
    }

    if (rightKey.isDown) {
      walk({ x: pos.x + 2 })
    }

    if (upKey.isDown) {
      walk({ y: pos.y + 2 })
    }

    if (downKey.isDown) {
      walk({ y: pos.y - 2 })
    }

    const stoppedWalking = isWalking(anim) && !leftKey.isDown && !rightKey.isDown && !upKey.isDown && !downKey.isDown
    if (stoppedWalking) {
      dispatchAnim({ type: 'IDLE' })
    }
  })

  function walk(newPos) {
    setPos(newPos)

    const facing = newPos.x !== undefined ? Math.sign(newPos.x - pos.x) : anim.facing

    dispatchAnim({ type: 'START_WALK', payload: { facing } })
  }

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
