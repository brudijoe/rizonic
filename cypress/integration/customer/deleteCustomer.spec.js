/// <reference types="Cypress" />
describe("customer customer", () => {
  it("visit localhost", () => {
    cy.visit("http://localhost:3000/", { failOnStatusCode: false });
  });
  it("open customer dropdown", () => {
    cy.get('[data-cy="open-dropdown"]').click();
    cy.get('[data-cy="customer-information"]').should("exist");
  });
  it("check if customer exists", () => {
    cy.get('[data-cy="customer-id"]').contains(10);
  });
  it("open delete customer modal", () => {
    cy.get('[data-cy="delete-customer-icon"]').last().click();
    cy.get('[data-cy="delete-customer-h1"]').contains("Delete Customer");
  });
  it("click yes delete customer button", () => {
    cy.get('[data-cy="delete-customer-button"]').click();
  });
  it("check if customer was deleted", () => {
    cy.get('[data-cy="customer-id"]').contains(10).should("not.exist");
  });
});
