/// <reference types="cypress" />


describe("ログイン画面のE2Eテスト", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it('ログイン画面に移動する', () => {
    cy.visit('/signup');
  })
