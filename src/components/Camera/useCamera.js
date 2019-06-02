import { useContext } from 'react'
import { CameraContext } from './Camera'

export default function useCamera() {
  return useContext(CameraContext)
}
