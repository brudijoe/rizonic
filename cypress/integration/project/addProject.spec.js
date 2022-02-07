/// <reference types="Cypress" />
describe("add project", () => {
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

  it("open add project modal", () => {
    cy.get('[data-cy="add-project-icon"]').first().click();
    cy.get('[data-cy="add-project-h1"]').contains("Add Project");
  });

  it("add new project data and press button", () => {
    cy.get('[data-cy="add-project-input"]').type("Example Project");
    cy.get('[data-cy="add-project-select"]').select(1);
    cy.get('[data-cy="add-project-select"]').contains("In progress");
    cy.get('[data-cy="add-project-button"]').click();
  });

  it("close project modal", () => {
    cy.get('[data-cy="add-project-close"]').click();
    cy.get('[data-cy="add-project-h1"]').should("not.exist");
  });
  it("check if example project exists", () => {
    cy.get('[data-cy="project-name"]').contains("Example Project");
  });
});
