/// <reference types="Cypress" />
describe("edit project", () => {
  it("visit localhost", () => {
    cy.visit("http://localhost:3000/", { failOnStatusCode: false });
  });

  it("open project dropdown", () => {
    cy.get('[data-cy="open-project-dropdown"]').first().click();
    cy.get('[data-cy="project-information"]').should("exist");
  });

  it("check if project exists", () => {
    cy.get('[data-cy="project-id"]').contains(2);
  });

  it("open edit project modal", () => {
    cy.get('[data-cy="edit-project-icon"]').first().click();
    cy.get('[data-cy="edit-project-h1"]').contains("Edit Project");
  });

  it("edit project data and press button", () => {
    cy.get('[data-cy="edit-project-input"]').clear().type("Edited Project");
    cy.get('[data-cy="edit-project-select"]').select(2);
    cy.get('[data-cy="edit-project-button"]').click();
  });

  it("check if project was edited", () => {
    cy.get('[data-cy="project-name"]').contains("Edited Project");
    cy.get('[data-cy="project-status"]').contains("On hold");
  });
});
