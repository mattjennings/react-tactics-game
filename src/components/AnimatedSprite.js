import { PixiComponent, applyDefaultProps, getTextureFromProps } from '@inlet/react-pixi'
import PropTypes from 'prop-types'
import * as PIXI from 'pixi.js'

const AnimatedSprite = PixiComponent('AnimatedSprite', {
  create() {
    return new PIXI.Graphics()
  },
  applyProps(instance, oldProps, newProps) {
    const { image, texture, ...props } = newProps
    applyDefaultProps(instance, oldProps, props)

    if ((texture && oldProps.texture !== newProps.texture) || (image && oldProps.image !== newProps.image)) {
      instance.texture = getTextureFromProps('Sprite', newProps)
    }
  }
})

export default AnimatedSprite
