import useForceUpdate from './useForceUpdate'
import { useTick } from '@inlet/react-pixi'

/**
 * Forces a component render on every tick
 */
export default function useRenderOnTick({ disable } = {}) {
  const forceUpdate = useForceUpdate()

  useTick(() => {
    if (!disable) {
      forceUpdate()
    }
  })
}
