import { useCallback } from 'react'
import useSetState from './useSetState'
import clamp from '../util/clamp'
import { useTilemap } from '../components/Tilemap'
import { useCamera } from '../components/Camera'

/**
 *
 * @param {{ x?: number, y?: number }} startingPosition
 * @param {{ bounds?: { width: number, height: number, pivot: [number, number] }, tileCollision?: boolean, cameraCollision?: boolean }} [options]
 * @returns {[{ x?: number, y?: number }, setPosition]}
 */
export default function usePosition(startingPosition, { bounds, tileCollision, cameraCollision } = {}) {
  const [state, setState] = useSetState(startingPosition)
  const { checkMove } = useTilemap()
  const { camera } = useCamera()

  const setPosition = useCallback(
    position => {
      let nextPosition = { ...position }

      if (bounds && tileCollision) {
        const availablePosition = checkMove(state, nextPosition, bounds)
        nextPosition = { ...availablePosition }
      }

      if (bounds && cameraCollision) {
        const { pivot = [0, 0] } = bounds

        nextPosition.x =
          nextPosition.x !== undefined
            ? clamp(
                camera.current.corner.x + pivot[0],
                nextPosition.x,
                camera.current.corner.x + camera.current.screenWidth - pivot[0]
              )
            : undefined

        nextPosition.y =
          nextPosition.y !== undefined
            ? clamp(
                camera.current.corner.y + pivot[1],
                nextPosition.y,
                camera.current.corner.y + camera.current.screenHeight - pivot[1]
              )
            : undefined
      }

      if (!bounds && (tileCollision || cameraCollision)) {
        console.warn('You must provide a `bounds` argument if you want to enable collisions')
      }

      setState(nextPosition)

      return nextPosition
    },

    [checkMove, camera, tileCollision, cameraCollision, bounds, state, setState]
  )

  return [state, setPosition]
}
