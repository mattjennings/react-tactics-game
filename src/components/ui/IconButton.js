import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import { FaVolumeUp, FaVolumeDown } from 'react-icons/fa'

const StyledDiv = styled(Button)`
  width: 32px;
  height: 32px;
  border: none;
  padding: 0;
  background: transparent;
  font-size: 2em;
`

export default function IconButton(props) {
  return <StyledDiv {...props} />
}
