import { PixiComponent } from '@inlet/react-pixi'
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

export default Rectangle
