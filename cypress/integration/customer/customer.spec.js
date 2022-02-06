/// <reference types="Cypress" />
describe("customer", () => {
  it("visit localhost", () => {
    cy.visit("http://localhost:3000/", { failOnStatusCode: false });
  });
  it("customer dropdown is closed", () => {
    cy.get('[data-cy="customer-information"]').should("not.exist");
  });
  it("open customer dropdown", () => {
    cy.get('[data-cy="open-dropdown"]').click();
    cy.get('[data-cy="customer-information"]').should("exist");
  });

  it("close customer dropdown", () => {
    cy.get('[data-cy="close-dropdown"]').click();
    cy.get('[data-cy="customer-information"]').should("not.exist");
  });
});
