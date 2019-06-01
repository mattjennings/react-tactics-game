import { useCallback } from 'react'
import useSetState from './useSetState'
import { useApp } from '@inlet/react-pixi'
import clamp from '../util/clamp'

// The app.stage.width/height seem to expand if you get too close to the edge
const STAGE_EDGE_BUFFER = 24

/**
 *
 * @param {{ x?: number, y?: number }} startingPosition
 * @param {{ limitBounds?: boolean }} [options]
 * @returns {[{ x?: number, y?: number }, setPosition]}
 */
export default function usePosition(startingPosition, { limitBounds }) {
  const [state, setState] = useSetState(startingPosition)
  const app = useApp()

  const setPosition = useCallback(
    newPosition => {
      if (limitBounds) {
        let clampedPosition = {
          x: newPosition.x !== undefined ? clamp(0, newPosition.x, app.stage.width - STAGE_EDGE_BUFFER) : undefined,
          y: newPosition.y !== undefined ? clamp(0, newPosition.y, app.stage.height - STAGE_EDGE_BUFFER) : undefined
        }

        setState(clampedPosition)
      } else {
        setState(newPosition)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [limitBounds, app.stage.width, app.stage.height]
  )

  return [state, setPosition]
}
