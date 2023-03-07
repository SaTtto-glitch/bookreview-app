/// <reference types="cypress" />

describe("ログイン画面のE2Eテスト", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/signup");
  });

  it("loads page and check title", () => {
    cy.get("h2").should("be.visible");
    cy.contains("新規作成");
  });

  it("Input name and email and submit form.", () => {
    cy.get('[data-e2e="name-input"]').type("taro");
    cy.wait(1000);
    cy.get('[data-e2e="mail-input"]').type("a@b.jp");
    cy.wait(1000);
    cy.get('[data-e2e="submit-button"]').click();
  });
});
