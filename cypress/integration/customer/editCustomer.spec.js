/// <reference types="Cypress" />
describe("edit customer", () => {
  it("visit localhost", () => {
    cy.visit("http://localhost:3000/", { failOnStatusCode: false });
  });
  it("open customer dropdown", () => {
    cy.get('[data-cy="open-customer-dropdown"]').click();
    cy.get('[data-cy="customer-information"]').should("exist");
  });
  it("check if customer exists", () => {
    cy.get('[data-cy="customer-id"]').contains(1);
  });
  it("open edit customer modal", () => {
    cy.get('[data-cy="edit-customer-icon"]').first().click();
    cy.get('[data-cy="edit-customer-h1"]').contains("Edit Customer");
  });
  it("edit customer data and press button", () => {
    cy.get('[data-cy="edit-customer-input"]').type("Edited Customer");
    cy.get('[data-cy="edit-customer-button"]').click();
  });
  it("check if customer was edited", () => {
    cy.get('[data-cy="customer-name"]').contains("Edited Customer");
  });
});
