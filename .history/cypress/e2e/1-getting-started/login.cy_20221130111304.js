/// <reference types="cypress" />


describe("ログイン画面のE2Eテスト", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/signup");
  });

  it('h1タグが存在することを確認する', () => {
    cy.get('h2')
  })

});
