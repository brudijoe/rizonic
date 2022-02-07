/// <reference types="Cypress" />
describe("delete project", () => {
  it("visit localhost", () => {
    cy.visit("http://localhost:3000/", { failOnStatusCode: false });
  });

  it("open customer dropdown", () => {
    cy.get('[data-cy="open-customer-dropdown"]').click();
    cy.get('[data-cy="customer-information"]').should("exist");
  });
  it("open project dropdown", () => {
    cy.get('[data-cy="open-project-dropdown"]').first().click();
    cy.get('[data-cy="project-information"]').should("exist");
  });
});
