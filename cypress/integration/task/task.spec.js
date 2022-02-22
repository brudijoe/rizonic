/// <reference types="Cypress" />
describe("task", () => {
  it("visit localhost", () => {
    cy.visit("http://localhost:3000/", { failOnStatusCode: false });
  });

  it("open project dropdown", () => {
    cy.get('[data-cy="open-project-dropdown"]').first().click();
    cy.get('[data-cy="project-information"]').should("exist");
  });

  it("check task information", () => {
    cy.get('[data-cy="task-information"]').should("exist");
  });

  it("close project dropdown", () => {
    cy.get('[data-cy="close-project-dropdown"]').click();
    cy.get('[data-cy="project-information"]').should("not.exist");
  });
});
