import { useDispatch as dispatchHook } from 'react-redux'
import { AppDispatch } from 'services/types'

export const useDispatch: () => AppDispatch = dispatchHook
