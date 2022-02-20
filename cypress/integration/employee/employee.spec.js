/// <reference types="Cypress" />
describe("employee", () => {
  it("visit localhost", () => {
    cy.visit("http://localhost:3000/employees", { failOnStatusCode: false });
  });

  it("check employee information", () => {
    cy.get('[data-cy="employee-information"]').should("exist");
  });

  describe("search employee", () => {
    it("three employees are found", () => {
      cy.get('[data-cy="customer-id"]').should("have.length", 3);
    });

    it("search first employee", () => {
      cy.get('[data-cy="employee-input-search"]').type("     IngO      ");
    });

    it("one employee is found", () => {
      cy.get('[data-cy="customer-id"]').should("have.length", 1);
    });
  });
});
