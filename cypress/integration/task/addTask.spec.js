/// <reference types="Cypress" />
describe("add task", () => {
  it("visit localhost", () => {
    cy.visit("http://localhost:3000/", { failOnStatusCode: false });
  });

  it("open project dropdown", () => {
    cy.get('[data-cy="open-project-dropdown"]').first().click();
    cy.get('[data-cy="project-information"]').should("exist");
  });

  it("check if first task id exists", () => {
    cy.get('[data-cy="task-id-tbody"]').first().contains(1);
  });
  it("add new task", () => {
    cy.get('[data-cy="add-task-icon"]').first().click();
  });

  it("task id 4 should exist", () => {
    cy.get('[data-cy="task-id-tbody"]').contains(4).should("exist");
  });
});
