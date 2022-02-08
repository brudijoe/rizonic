/// <reference types="Cypress" />
describe("task", () => {
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

  it("check if first task id exists", () => {
    cy.get('[data-cy="task-id-tbody"]').first().contains(1);
  });
  it("delete first task", () => {
    cy.get('[data-cy="delete-task-icon"]').first().click();
  });

  it("task id 1 should not exist", () => {
    cy.get('[data-cy="task-id-tbody"]').first().contains(1).should("not.exist");
  });
});
