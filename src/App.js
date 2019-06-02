import { Stage } from '@inlet/react-pixi'
import React from 'react'
import Level1 from './components/levels/Level1'
import UIOverlay from './components/ui/UIOverlay'
import Ratio from 'react-ratio'
import styled from 'styled-components'

const App = () => (
  <>
    <Stage id="stage" width={400} height={224} options={{}}>
      <Level1 />
    </Stage>
    <UIOverlay />
  </>
)

export default App
