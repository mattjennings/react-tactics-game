import React from 'react'
import { Text } from '@inlet/react-pixi'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error(error)
  }

  render() {
    if (this.state.hasError) {
      return <Text text="An error occurred" style={{ fill: 'red' }} x={0} y={0} />
    }

    return this.props.children
  }
}

export default ErrorBoundary
