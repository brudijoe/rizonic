/// <reference types="Cypress" />
describe("statistics", () => {
  it("visit localhost", () => {
    cy.visit("http://localhost:3000/statistics", { failOnStatusCode: false });
  });

  it("statistics should be hidden", () => {
    cy.get('[data-cy="line-statistic"]').should("not.exist");
  });

  describe("show customer statistics", () => {
    it("click customers button", () => {
      cy.get('[data-cy="statistics-customer-button"]').click();
    });
    it("show customer statistics", () => {
      cy.get('[data-cy="line-statistic"]').should("exist");
    });
  });

  describe("show project statistics", () => {
    // TODO
  });

  describe("show deparment statistics", () => {
    // TODO
  });

  describe("show employee statistics", () => {
    // TODO
  });
});
