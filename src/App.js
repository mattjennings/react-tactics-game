import { Stage } from '@inlet/react-pixi'
import React from 'react'
import Level1 from './components/levels/Level1'

const App = () => (
  <Stage id="stage" width={400} height={256} options={{}}>
    <Level1 />
  </Stage>
)

export default App
