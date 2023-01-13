import {
  authenticateUserRequest,
  editUserRequest,
  getUserRequest,
  logoutRequest,
  registerUserRequest,
} from 'api'
import { setCookie, deleteCookie } from 'utils/helpers'

import {
  USER_REQUEST,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_FAILED,
  LOGOUT,
} from 'services/constants/auth'
import {
  ILoginResponse,
  IRegisterResponse,
  IUser,
  IUserEditResponse,
  IUserResponse,
} from 'services/types/data'
import {
  IEditUserForm,
  ILoginForm,
  IRegistrationForm,
} from 'services/types/forms'
import { AppDispatch, AppThunk } from 'services/types'

export interface IUserRequestAction {
  readonly type: typeof USER_REQUEST
}

export interface IUserRequestSuccessAction {
  readonly type: typeof USER_REQUEST_SUCCESS
  readonly user: IUser
}

export interface IUserRequestFailedAction {
  readonly type: typeof USER_REQUEST_FAILED
  readonly error: string
}

export interface ILogoutAction {
  readonly type: typeof LOGOUT
}

export type TAuthActions =
  | IUserRequestAction
  | IUserRequestSuccessAction
  | IUserRequestFailedAction
  | ILogoutAction

export const userRequestAction = (): IUserRequestAction => ({
  type: USER_REQUEST,
})

export const userRequestSuccessAction = (
  user: IUser,
): IUserRequestSuccessAction => ({
  type: USER_REQUEST_SUCCESS,
  user,
})

export const userRequestFailedAction = (
  error: string,
): IUserRequestFailedAction => ({ type: USER_REQUEST_FAILED, error })

export const logoutAction = (): ILogoutAction => ({ type: LOGOUT })

export const registerUserThunk: AppThunk =
  (userInfo: IRegistrationForm) => (dispatch: AppDispatch) => {
    dispatch(userRequestAction())
    registerUserRequest(userInfo)
      .then(({ refreshToken, accessToken, user }: IRegisterResponse) => {
        const SECONDS_IN_MINUTE = 60
        setCookie('token', accessToken.split('Bearer ')[1], {
          expires: 15 * SECONDS_IN_MINUTE,
        })
        sessionStorage.setItem('refreshToken', refreshToken)
        dispatch(userRequestSuccessAction(user))
      })
      .catch((error: string) => dispatch(userRequestFailedAction(error)))
  }

export const signInThunk: AppThunk =
  (credentials: ILoginForm) => (dispatch: AppDispatch) => {
    dispatch(userRequestAction())
    authenticateUserRequest(credentials)
      .then(({ accessToken, refreshToken, user }: ILoginResponse) => {
        const SECONDS_IN_MINUTE = 60
        setCookie('token', accessToken.split('Bearer ')[1], {
          expires: 15 * SECONDS_IN_MINUTE,
        })
        sessionStorage.setItem('refreshToken', refreshToken)
        dispatch(userRequestSuccessAction(user))
      })
      .catch((error: string) => dispatch(userRequestFailedAction(error)))
  }

export const getUserThunk: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(userRequestAction())
  getUserRequest()
    .then(({ user }: IUserResponse) => {
      dispatch(userRequestSuccessAction(user))
    })
    .catch((error: string) => dispatch(userRequestFailedAction(error)))
}

export const editUserThunk: AppThunk =
  (form: IEditUserForm) => (dispatch: AppDispatch) => {
    dispatch(userRequestAction())
    editUserRequest(form)
      .then(({ user }: IUserEditResponse) =>
        dispatch(userRequestSuccessAction(user)),
      )
      .catch((error: string) => dispatch(userRequestFailedAction(error)))
  }

export const signOutThunk: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(userRequestAction())
  logoutRequest()
    .then(res => {
      dispatch(logoutAction())
      deleteCookie('token')
    })
    .catch((error: string) => dispatch(userRequestFailedAction(error)))
    .finally(res => sessionStorage.removeItem('refreshToken'))
}
