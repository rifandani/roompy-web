// load type definitions that come with Cypress module
/// <reference types="cypress" />

interface IPostQrcodeRequestBody {
  url: string
}

interface IPutUserRequestBody {
  username: string
  email: string
}

interface IRegisterUserRequestBody extends IPutUserRequestBody {
  id: string
}

declare namespace Cypress {
  interface Chainable {
    // qrcode
    postQrcode(requestBody: IPostQrcodeRequestBody): Chainable<Response>
    // users
    getUsers(): Chainable<Response>
    getUser(id: string): Chainable<Response>
    putUser(id: string, requestBody: IPutUserRequestBody): Chainable<Response>
    deleteUser(id: string): Chainable<Response>
    // auth
    registerUser(requestBody: IRegisterUserRequestBody): Chainable<Response>
  }
}
