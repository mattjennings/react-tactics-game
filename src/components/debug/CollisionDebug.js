import { Container, Text } from '@inlet/react-pixi'
import React from 'react'
import getCollisionBounds from '../../util/getCollisionBounds'
import Rectangle from '../Rectangle'

const CollisionDebug = ({ position, bounds }) => {
  const collisionBounds = getCollisionBounds(position, bounds)
  return (
    <Container>
      <Rectangle
        x={Math.round(collisionBounds.left)}
        y={Math.round(collisionBounds.top)}
        width={Math.round(collisionBounds.right - collisionBounds.left)}
        height={Math.round(collisionBounds.bottom - collisionBounds.top)}
        color={0xff0000}
        outline
      />
      <Text
        x={Math.round(collisionBounds.left - 24)}
        y={Math.round(collisionBounds.top + 4)}
        text={Math.round(collisionBounds.left)}
        fontSize={16}
        style={{ fill: 'red', fontSize: 12 }}
      />
      <Text
        x={Math.round(collisionBounds.left + 1)}
        y={Math.round(collisionBounds.bottom + 4)}
        text={Math.round(collisionBounds.bottom)}
        fontSize={16}
        style={{ fill: 'red', fontSize: 12 }}
      />
      <Text
        x={Math.round(collisionBounds.right + 2)}
        y={Math.round(collisionBounds.top + 4)}
        text={Math.round(collisionBounds.right)}
        fontSize={16}
        style={{ fill: 'red', fontSize: 12 }}
      />
      <Text
        x={Math.round(collisionBounds.left + 1)}
        y={Math.round(collisionBounds.top - 16)}
        text={Math.round(collisionBounds.top)}
        fontSize={16}
        style={{ fill: 'red', fontSize: 12 }}
      />
    </Container>
  )
}
export default CollisionDebug
