import { Container, Sprite, useTick } from '@inlet/react-pixi'
import React, { useEffect } from 'react'
import useKey from '../../hooks/useKey'
import usePosition from '../../hooks/usePosition'
import { useCamera } from '../Camera'
import usePlayerAnimation from './usePlayerAnimation'
import { CollisionDebug } from '../debug'

const WALKING_SPEED = 1.8

const bounds = {
  width: 24,
  height: 24,
  pivot: [12, 12]
}

const Player = ({ startingPosition }) => {
  const leftKey = useKey(65) // A
  const rightKey = useKey(68) // D
  const downKey = useKey(87) // S
  const upKey = useKey(83) // W

  const { moveCamera } = useCamera()

  const { sprite, setAnimation, facing } = usePlayerAnimation()

  const [pos, setPos] = usePosition(startingPosition, { bounds, tileCollision: true, cameraCollision: true })

  // set initial camera position
  useEffect(() => {
    moveCamera(pos)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Movement
  useTick(delta => {
    // set velocity based on combination of left/down/up/left
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
      // the position that we want to move to before we collision check
      const desiredPos = { x: pos.x + velocity.x * delta, y: pos.y + velocity.y * delta }

      // get new direction based on desiredPos (if we walk left and hit a wall, we still want to face left)
      const newFacing = velocity.x ? Math.sign(desiredPos.x - pos.x) : facing

      // update position and camera
      const nextPos = setPos(desiredPos)
      moveCamera(nextPos)

      // update animation
      setAnimation('WALK', { frame: 1, facing: newFacing })
    }

    // update animation if we stopped walking
    const stoppedWalking = !leftKey.isDown && !rightKey.isDown && !upKey.isDown && !downKey.isDown
    if (stoppedWalking) {
      setAnimation('IDLE')
    }
  })

  return (
    <Container>
      <Sprite
        texture={sprite}
        x={Math.round(pos.x)}
        y={Math.round(pos.y)}
        pivot={bounds.pivot}
        scale={{ x: facing, y: 1 }}
        interactive
        pointerdown={() => {
          console.log('player clicked')
        }}
      />

      {false && <CollisionDebug position={pos} bounds={bounds} />}
    </Container>
  )
}
export default Player
