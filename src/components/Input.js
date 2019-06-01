import { withPixiApp } from '@inlet/react-pixi'
import React from 'react'

class Input extends React.Component {
  upListener
  downListener

  state = {
    isDown: false,
    isUp: true
  }

  constructor(props) {
    super(props)

    props.app.ticker.add(this.loop, this)
  }

  loop(delta) {
    const { onDown, onUp } = this.props
    const { isDown, isUp } = this.state
    if (isDown && onDown) {
      onDown(delta)
    }

    if (isUp && onUp) {
      onUp(delta)
    }
  }

  componentWillMount() {
    this.downListener = event => {
      const { keyCode, onPress } = this.props
      const { isUp } = this.state

      if (event.keyCode === keyCode) {
        if (isUp && onPress) {
          onPress()
        }
        this.setState({
          isDown: true,
          isUp: false
        })
        event.preventDefault()
      }
    }

    this.upListener = event => {
      const { keyCode, onRelease } = this.props
      const { isDown } = this.state

      if (event.keyCode === keyCode) {
        if (isDown && onRelease) {
          onRelease()
        }
        this.setState({
          isDown: false,
          isUp: true
        })
        event.preventDefault()
      }
    }

    window.addEventListener('keydown', this.downListener, false)
    window.addEventListener('keyup', this.upListener, false)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.downListener)
    window.removeEventListener('keyup', this.upListener)
    this.props.app.ticker.remove(this.loop, this)
  }

  render() {
    return null
  }
}

export default withPixiApp(Input)
