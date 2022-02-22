/// <reference types="Cypress" />
describe("delete project", () => {
  it("visit localhost", () => {
    cy.visit("http://localhost:3000/", { failOnStatusCode: false });
  });
  it("open project dropdown", () => {
    cy.get('[data-cy="open-project-dropdown"]').first().click();
    cy.get('[data-cy="project-information"]').should("exist");
  });
  it("check if 3 projects exist", () => {
    cy.get('[data-cy="project-information"]').should("have.length", 3);
  });
  it("open last project modal", () => {
    cy.get('[data-cy="delete-project-icon"]').last().click();
    cy.get('[data-cy="delete-project-h1"]').contains("Delete Project");
  });

  it("delete last project", () => {
    cy.get('[data-cy="delete-project-button"]').click();
  });
  it("check if last project was deleted", () => {
    cy.get('[data-cy="project-information"]').should("have.length", 2);
  });
});
