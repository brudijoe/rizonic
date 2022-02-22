/// <reference types="Cypress" />
describe("project", () => {
  it("visit localhost", () => {
    cy.visit("http://localhost:3000/", { failOnStatusCode: false });
  });

  it("open project dropdown", () => {
    cy.get('[data-cy="open-project-dropdown"]').first().click();
    cy.get('[data-cy="project-information"]').should("exist");
  });

  it("close project dropdown", () => {
    cy.get('[data-cy="close-project-dropdown"]').click();
    cy.get('[data-cy="project-information"]').should("not.exist");
  });
});
