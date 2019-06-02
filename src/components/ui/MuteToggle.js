import React, { useState } from 'react'
import styled from 'styled-components'
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'
import IconButton from './IconButton'
import ps from 'pixi-sound'

ps.sound.muteAll()
const StyledButton = styled(IconButton)`
  position: absolute;
  top: 32px;
  right: 32px;
`

export default function MuteToggle() {
  const [muted, setMuted] = useState(true)

  function toggleMute() {
    if (muted) {
      ps.sound.unmuteAll()
    } else {
      ps.sound.muteAll()
    }
    setMuted(!muted)
  }

  return <StyledButton onClick={toggleMute}>{muted ? <FaVolumeMute /> : <FaVolumeUp />}</StyledButton>
}
