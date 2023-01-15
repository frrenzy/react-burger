export interface IRegistrationForm {
  name: string
  email: string
  password: string
}

export interface IForgotPasswordForm {
  email: string
}

export interface IResetPasswordForm {
  code: string
  password: string
}

export interface ILoginForm {
  email: string
  password: string
}

export interface IEditUserForm {
  name: string
  email: string
  password: string
}

export interface ICreateOrderForm {
  ingredients: string[]
}
