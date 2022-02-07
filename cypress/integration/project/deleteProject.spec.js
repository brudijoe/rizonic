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

  it("open delete project modal", () => {
    cy.get('[data-cy="delete-project-icon"]').first().click();
    cy.get('[data-cy="delete-project-h1"]').contains("Delete Project");
  });

  it("click yes delete project button", () => {
    cy.get('[data-cy="delete-project-button"]').click();
  });
  it("check if project was deleted", () => {
    cy.get('[data-cy="project-id"]').contains(2).should("not.exist");
  });
});
