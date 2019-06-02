import { Container, Text } from '@inlet/react-pixi'
import React from 'react'
import getCollisionBounds from '../../util/getCollisionBounds'
import Rectangle from '../Rectangle'

const CollisionDebug = ({ position, bounds }) => {
  const collisionBounds = getCollisionBounds(position, bounds)
  return (
    <Container>
      <Rectangle
        x={collisionBounds.left}
        y={collisionBounds.top}
        width={collisionBounds.right - collisionBounds.left}
        height={collisionBounds.bottom - collisionBounds.top}
        color={0xff0000}
        outline
      />
      <Text
        x={collisionBounds.left - 24}
        y={collisionBounds.top + 4}
        text={collisionBounds.left}
        fontSize={16}
        style={{ fill: 'red', fontSize: 12 }}
      />
      <Text
        x={collisionBounds.left + 1}
        y={collisionBounds.bottom + 4}
        text={collisionBounds.bottom}
        fontSize={16}
        style={{ fill: 'red', fontSize: 12 }}
      />
      <Text
        x={collisionBounds.right + 2}
        y={collisionBounds.top + 4}
        text={collisionBounds.right}
        fontSize={16}
        style={{ fill: 'red', fontSize: 12 }}
      />
      <Text
        x={collisionBounds.left + 1}
        y={collisionBounds.top - 16}
        text={collisionBounds.top}
        fontSize={16}
        style={{ fill: 'red', fontSize: 12 }}
      />
    </Container>
  )
}
export default CollisionDebug
