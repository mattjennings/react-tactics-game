import { Stage } from '@inlet/react-pixi'
import React from 'react'
import Level1 from './components/levels/Level1'
import ErrorBoundary from './components/ErrorBoundary'

const App = () => (
  <Stage id="stage" width={400} height={224} options={{}}>
    <ErrorBoundary>
      <Level1 />
    </ErrorBoundary>
  </Stage>
)

export default App
