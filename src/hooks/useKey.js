import { useEffect } from 'react'
import { useTick } from '@inlet/react-pixi'
import useMergingState from './useMergingState'

export default function useKey(keyCode) {
  const [state, setState] = useMergingState({ isDown: false, isUp: false, isPressed: false, isReleased: false })

  useTick(() => {
    if (state.isPressed || state.isReleased) {
      setState({ isPressed: false, isReleased: false })
    }
  })

  useEffect(() => {
    const downListener = event => {
      if (event.keyCode === keyCode) {
        setState({
          isDown: true,
          isUp: false,
          isPressed: true
        })
        event.preventDefault()
      }
    }

    const upListener = event => {
      if (event.keyCode === keyCode) {
        setState({
          isDown: false,
          isUp: true,
          isReleased: true
        })
        event.preventDefault()
      }
    }

    window.addEventListener('keydown', downListener, false)
    window.addEventListener('keyup', upListener, false)

    return () => {
      window.removeEventListener('keydown', downListener)
      window.removeEventListener('keyup', upListener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyCode])

  return state
}
