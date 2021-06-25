/// <reference types="cypress" />

interface IPostQrcodeRequestBody {
  url: string
}

interface IPostQrcodeResponseBody {
  error: boolean
  url: string
}

interface IGetUserResponseBody {
  user: Record<string, unknown> // should be User
}

interface IGetUsersResponseBody {
  users: [] // should be User[]
}

interface IPutUserRequestBody {
  username: string
  email: string
}

interface IPutUserResponseBody {
  error: boolean
  message: string
}

interface IDeleteUserResponseBody {
  error: boolean
  message: string
}

interface IRegisterUserRequestBody extends IPutUserRequestBody {
  id: string
}

interface IRegisterUserResponseBody {
  error: boolean
  message: string
}

declare namespace Cypress {
  interface Chainable {
    // qrcode
    postQrcode(
      requestBody: IPostQrcodeRequestBody
    ): Chainable<Response<IPostQrcodeResponseBody>>

    // users
    getUsers(): Chainable<Response<IGetUsersResponseBody>>
    getUser(userId: string): Chainable<Response<IGetUserResponseBody>>
    putUser(
      userId: string,
      requestBody: IPutUserRequestBody
    ): Chainable<Response<IPutUserResponseBody>>
    deleteUser(userId: string): Chainable<Response<IDeleteUserResponseBody>>

    // auth
    registerUser(
      requestBody: IRegisterUserRequestBody
    ): Chainable<Response<IRegisterUserResponseBody>>
  }
}
