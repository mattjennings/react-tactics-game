import { useReducer } from 'react'

/**
 * Hook version of a class component's `setState`
 * @param {*} initialState
 */
export default function useSetState(initialState = {}) {
  return useReducer((state, action) => ({ ...state, ...action }), initialState)
}
