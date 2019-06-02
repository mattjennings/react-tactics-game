import { Sprite, useTick, Container, Text } from '@inlet/react-pixi'
import React, { useEffect } from 'react'
import useKey from '../../hooks/useKey'
import { useCamera } from '../Camera'
import { useTilemap } from '../Tilemap'
import usePosition from '../../hooks/usePosition'
import usePlayerAnimation from './usePlayerAnimation'
import Rectangle from '../Rectangle'
import getCollisionBounds from '../../util/getCollisionBounds'
import { CollisionDebug } from '../debug'

const WALKING_SPEED = 2

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
  const { checkMove } = useTilemap()

  const { sprite, setAnimation, facing } = usePlayerAnimation()

  const [pos, setPos] = usePosition(startingPosition, { limitBounds: true })

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
      const desiredPos = { x: Math.round(pos.x + velocity.x * delta), y: Math.round(pos.y + velocity.y * delta) }
      const { x: newX, y: newY } = checkMove(pos, desiredPos, bounds)

      // get new direction based on desiredPos (if we walk left and hit a wall, we still want to face left)
      const newFacing = velocity.x ? Math.sign(desiredPos.x - pos.x) : facing

      // update position and camera
      setPos({ x: newX, y: newY })
      moveCamera({ x: newX, y: newY })

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
      <Sprite texture={sprite} x={pos.x} y={pos.y} pivot={bounds.pivot} scale={{ x: facing, y: 1 }} />

      <CollisionDebug position={pos} bounds={bounds} />
    </Container>
  )
}
export default Player
