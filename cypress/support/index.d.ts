// load the global Cypress types
/// <reference types="cypress" />
// no export & import, will cause errors

/* --------------------------------------------- api types -------------------------------------------- */

type TErrorResponse = {
  error: boolean
  message: string
  name?: string // 500
  errors?: string[] // 500
}

type TCommonApiResponse = {
  error: boolean
  message: string
}

type TLoginApi = { id: string }
type TRegisterApi = { id: string; username: string; email: string }

type IPostQrcodeReqBody = { url: string }
type IPostQrcodeResBody = { error: boolean; url: string }

declare namespace Cypress {
  interface Chainable {
    /* ------------------------------------------- helpers ------------------------------------------ */
    dataCy(
      dataTestAttribute: string,
      args?: Partial<
        Cypress.Loggable &
          Cypress.Timeoutable &
          Cypress.Withinable &
          Cypress.Shadow
      >
    ): Chainable<Element>

    /* --------------------------------------------- api -------------------------------------------- */

    // auth
    loginByApi(
      reqBody: TLoginApi
    ): Chainable<Response<TCommonApiResponse & TErrorResponse>>
    registerByApi(
      reqBody: TRegisterApi
    ): Chainable<Response<TCommonApiResponse & TErrorResponse>>

    // qrcode
    postQrcode(
      reqBody: IPostQrcodeReqBody
    ): Chainable<Response<IPostQrcodeResBody & TErrorResponse>>

    /* --------------------------------------------- UI --------------------------------------------- */
  }
}
