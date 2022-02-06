/// <reference types="Cypress" />
describe("add customer", () => {
  it("visit localhost", () => {
    cy.visit("http://localhost:3000/", { failOnStatusCode: false });
  });
  it("open add customer modal", () => {
    cy.get('[data-cy="add-customer-icon"]').click();
    cy.get('[data-cy="add-customer-h1"]').contains("Add Customer");
  });
  it("add new customer data and press button", () => {
    cy.get('[data-cy="add-customer-input"]').type("Example Customer");
    cy.get('[data-cy="add-customer-button"]').click();
  });

  it("close add customer modal", () => {
    cy.get('[data-cy="add-customer-close"]').click();
    cy.get('[data-cy="add-customer-h1"]').should("not.exist");
  });
  it("open customer dropdown", () => {
    cy.get('[data-cy="open-customer-dropdown"]').click();
    cy.get('[data-cy="customer-information"]').should("exist");
  });
  it("check if example customer exists", () => {
    cy.get('[data-cy="customer-name"]').contains("Example Customer");
  });
});
