import React, { useLayoutEffect, useEffect, useState } from 'react'
import styled from 'styled-components'
import MuteToggle from './MuteToggle'

import useWindowSize from '../../hooks/useWindowSize'

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: ${props => props.width};
  height: ${props => props.height};
  margin: auto;
`

const Content = styled.div`
  position: relative;

  font-size: 12px;
  @media screen and (min-width: 800px) {
    font-size: 24px;
  }
`

export default function UIOverlay({ children }) {
  const { innerHeight, innerWidth } = useWindowSize()
  const [size, setSize] = useState({ width: 0, height: 0 })

  /**
   * I could not find a CSS way to match the scaled size & position of the canvas...
   * so we'll do a very hacky way of getting the computed style and matching it whenever we resize
   */
  function resizeToCanvas() {
    const stageEl = document.getElementById('stage')

    if (stageEl) {
      setSize({ width: window.getComputedStyle(stageEl).width, height: window.getComputedStyle(stageEl).height })
    }
  }

  useLayoutEffect(() => {
    resizeToCanvas()
  }, [])

  useEffect(() => {
    resizeToCanvas()
  }, [innerHeight, innerWidth])

  return (
    <Overlay width={size.width} height={size.height}>
      <Content>
        <MuteToggle />
      </Content>
    </Overlay>
  )
}
