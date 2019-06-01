import { useReducer } from 'react'

export default function useMergingState(initialState = {}) {
  return useReducer((state, action) => ({ ...state, ...action }), initialState)
}
