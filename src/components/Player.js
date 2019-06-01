import { Sprite, useTick } from '@inlet/react-pixi'
import React, { useReducer } from 'react'
import useMergingState from '../hooks/useMergingState'
import useSpritesheet from '../hooks/useSpritesheet'
import Input from './Input'

const Player = ({ startingPosition }) => {
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

  useTick(delta => {
    let nextFrame = ((anim.frame + anim.fps) * delta) % (sprites.length + 1)

    // loop starts on first frame
    if (nextFrame >= sprites.length) {
      nextFrame = 1
    }

    if (nextFrame !== anim.frame) {
      dispatchAnim({ type: 'UPDATE_FRAME', payload: nextFrame })
    }
  })

  function walk(newPos) {
    setPos(newPos)

    const facing = newPos.x !== undefined ? Math.sign(newPos.x - pos.x) : anim.facing

    dispatchAnim({ type: 'START_WALK', payload: { facing } })
  }

  function idle() {
    dispatchAnim({ type: 'IDLE' })
  }

  return (
    <>
      {/* D */}
      <Input keyCode={68} onDown={() => walk({ x: pos.x + 2 })} onRelease={idle} />
      {/* A */}
      <Input keyCode={65} onDown={() => walk({ x: pos.x - 2 })} onRelease={idle} />
      {/* W */}
      <Input keyCode={87} onDown={() => walk({ y: pos.y - 2 })} onRelease={idle} />
      {/* S */}
      <Input keyCode={83} onDown={() => walk({ y: pos.y + 2 })} onRelease={idle} />

      <Sprite
        texture={sprites[Math.floor(anim.frame)]}
        x={pos.x}
        y={pos.y}
        pivot={[12, 0]}
        scale={{ x: anim.facing, y: 1 }}
      />
    </>
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
        fps: 0.1,
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
