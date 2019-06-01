import { PixiComponent } from '@inlet/react-pixi'
import Viewport from 'pixi-viewport'
import React, { useRef } from 'react'

// export interface CameraProps {
//   cameraRef?: React.RefObject<Viewport>
//   width: number
//   height: number
//   worldWidth: number
//   worldHeight: number
//   children?: JSX.Element
// }

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

// interface CameraContextValue {
//   camera?: { current?: Viewport }
//   moveCamera: (x: number, y: number) => any
// }

export const CameraContext = React.createContext({
  moveCamera: () => {}
})

export default function Camera({ children, ...props }) {
  const camera = useRef(null)

  function moveCamera({ x, y }) {
    if (camera.current) {
      camera.current.moveCenter(
        x !== undefined ? x : camera.current.center.x,
        y !== undefined ? y : camera.current.center.y
      )
    }
  }

  return (
    <CameraComponent {...props} ref={camera}>
      <CameraContext.Provider value={{ camera, moveCamera }}>{children}</CameraContext.Provider>
    </CameraComponent>
  )
}
