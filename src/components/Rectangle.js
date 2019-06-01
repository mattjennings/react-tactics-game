import { PixiComponent } from '@inlet/react-pixi'
import PropTypes from 'prop-types'
import * as PIXI from 'pixi.js'

const Rectangle = PixiComponent('Rectangle', {
  create() {
    return new PIXI.Graphics()
  },
  applyProps(ins, oldProps, newProps) {
    ins.clear()

    ins.rotation = newProps.rotation || 0
    if (newProps.outline) {
      ins.lineStyle(1, newProps.color)
      ins.drawRect(newProps.x, newProps.y, newProps.width, newProps.height)
    } else {
      ins.beginFill(newProps.color, newProps.alpha || 1)
      ins.drawRect(newProps.x, newProps.y, newProps.width, newProps.height)
      ins.endFill()
    }
  }
})

Rectangle.propTypes = {
  x: PropTypes.number.required,
  y: PropTypes.number.required,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.number,
  alpha: PropTypes.number,
  outline: PropTypes.boolean,
  rotation: PropTypes.number
}

export default Rectangle
