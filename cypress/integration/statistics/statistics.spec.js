/// <reference types="Cypress" />
describe("statistics", () => {
  it("visit localhost", () => {
    cy.visit("http://localhost:3000/statistics", { failOnStatusCode: false });
  });
});
