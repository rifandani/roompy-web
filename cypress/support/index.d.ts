// load type definitions that come with Cypress module
/// <reference types="cypress" />

interface IPostQrcodeRequestBody {
  url: string
}

declare namespace Cypress {
  interface Chainable {
    postQrcode(requestBody: IPostQrcodeRequestBody): Chainable<Response>
  }
}
