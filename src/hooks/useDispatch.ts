import { useDispatch as dispatchHook } from 'react-redux'
import { AppDispatch, AppThunk } from 'services/types'

export const useDispatch: () => AppDispatch | AppThunk = dispatchHook
