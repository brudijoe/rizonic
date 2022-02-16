/// <reference types="Cypress" />
describe("delete customer", () => {
  it("visit localhost", () => {
    cy.visit("http://localhost:3000/", { failOnStatusCode: false });
  });
  it("open customer dropdown", () => {
    cy.get('[data-cy="open-customer-dropdown"]').click();
    cy.get('[data-cy="customer-information"]').should("exist");
  });
  it("check if 3 customers exist", () => {
    cy.get('[data-cy="customer-information"]').should("have.length", 3);
  });
  it("open last customer modal", () => {
    cy.get('[data-cy="delete-customer-icon"]').last().click();
    cy.get('[data-cy="delete-customer-h1"]').contains("Delete Customer");
  });
  it("delete last customer", () => {
    cy.get('[data-cy="delete-customer-button"]').click();
  });
  it("check if last customer was deleted", () => {
    cy.get('[data-cy="customer-information"]').should("have.length", 2);
  });
});
