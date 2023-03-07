/// <reference types="cypress" />


describe("ログイン画面のE2Eテスト", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it('h1タグが存在することを確認する', () => {
    cy.visit('/login');
    cy.get('h1').should('be.visible')
  })

});
