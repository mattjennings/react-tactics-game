import { useReducer, useCallback } from 'react'
import useSpriteAnimation from '../../hooks/useSpriteAnimation'
import useSpritesheet from '../../hooks/useSpritesheet'

/**
 * Controls animation state for Player
 */
export default function usePlayerAnimation() {
  const sprites = useSpritesheet({
    spritesheet: '/assets/rpg-pack/chars/gabe/gabe-idle-run.png',
    frameWidth: 24,
    frameHeight: 24
  })

  const [state, dispatch] = useReducer(reducer, {
    facing: 1,
    fps: 0,
    anim: 'IDLE'
  })

  const [sprite, frame, setFrame] = useSpriteAnimation({ sprites, fps: state.fps, loopFrame: 1 })

  const setAnimation = useCallback(
    (animName, { frame = 0, facing = state.facing } = {}) => {
      if (animName !== state.anim || facing !== state.facing) {
        setFrame(frame)
        dispatch({ type: animName, payload: { frame, facing } })
      }
    },
    [setFrame, state.anim, state.facing]
  )

  return {
    sprite,
    facing: state.facing,
    anim: state.anim,
    frame,
    setAnimation
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'WALK': {
      const { facing } = action.payload
      if (state.anim === 'WALK' && state.facing === facing) {
        return state
      }

      return {
        ...state,
        anim: 'WALK',
        fps: 0.2,
        facing
      }
    }
    case 'IDLE':
      return {
        ...state,
        anim: 'IDLE',
        fps: 0
      }
    default:
      return state
  }
}
