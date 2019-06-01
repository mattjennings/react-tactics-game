import { PixiComponent, useApp } from '@inlet/react-pixi'
import Viewport from 'pixi-viewport'
import React, { useRef } from 'react'
import clamp from '../util/clamp'

const CameraComponent = PixiComponent('Camera', {
  create: props => {
    const camera = new Viewport({
      screenWidth: props.width,
      screenHeight: props.height,
      worldWidth: props.worldWidth,
      worldHeight: props.worldHeight
    })

    return camera
  },
  applyProps: (g, _, props) => {
    // noop
  }
})

export const CameraContext = React.createContext({
  moveCamera: () => {}
})

export default function Camera({ children, ...props }) {
  const camera = useRef(null)
  const app = useApp()

  console.log(app.stage._bounds)
  function moveCamera({ x, y }) {
    if (camera.current) {
      const newCenterX = x !== undefined ? x : camera.current.center.x
      const newCenterY = y !== undefined ? y : camera.current.center.y

      camera.current.moveCenter(
        clamp(camera.current.screenWidth / 2, newCenterX, app.stage.width - camera.current.screenWidth / 2),
        clamp(camera.current.screenHeight / 2, newCenterY, app.stage.height - camera.current.screenHeight / 2)
      )
    }
  }

  return (
    <CameraComponent width={app.view.width} height={app.view.height} {...props} ref={camera}>
      <CameraContext.Provider value={{ camera, moveCamera }}>{children}</CameraContext.Provider>
    </CameraComponent>
  )
}
