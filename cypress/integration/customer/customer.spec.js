/// <reference types="Cypress" />
describe("customer", () => {
  it("visit localhost", () => {
    cy.visit("http://localhost:3000/", { failOnStatusCode: false });
  });
});
