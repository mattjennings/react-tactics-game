import { Sprite, useTick } from '@inlet/react-pixi'
import React, { useContext, useEffect } from 'react'
import useKey from '../../hooks/useKey'
import { CameraContext } from '../Camera'
import usePosition from '../../hooks/usePosition'
import usePlayerAnimation from './usePlayerAnimation'

const WALKING_SPEED = 2

const Player = ({ startingPosition }) => {
  const leftKey = useKey(65) // A
  const rightKey = useKey(68) // D
  const downKey = useKey(87) // S
  const upKey = useKey(83) // W

  const { sprite, setAnimation, facing } = usePlayerAnimation()

  const { moveCamera } = useContext(CameraContext)

  const [pos, setPos] = usePosition(startingPosition, { limitBounds: true })

  // set initial camera position
  useEffect(() => {
    moveCamera(pos)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      const newFacing = velocity.x ? Math.sign(newPos.x - pos.x) : facing

      setPos(newPos)
      moveCamera({ ...pos, ...newPos })
      setAnimation('WALK', { frame: 1, facing: newFacing })
    }

    const stoppedWalking = !leftKey.isDown && !rightKey.isDown && !upKey.isDown && !downKey.isDown
    if (stoppedWalking) {
      setAnimation('IDLE')
    }
  })

  return <Sprite texture={sprite} x={pos.x} y={pos.y} pivot={[12, 0]} scale={{ x: facing, y: 1 }} />
}

export default Player
