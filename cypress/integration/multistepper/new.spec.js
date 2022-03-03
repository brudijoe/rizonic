/// <reference types="Cypress" />
describe("new", () => {
  it("visit localhost", () => {
    cy.visit("http://localhost:3000/new", { failOnStatusCode: false });
  });

  describe("add customer in multi stepper", () => {
    // TODO
  });
  describe("add project in multi stepper", () => {
    // TODO
  });
  describe("add task in multi stepper", () => {
    // TODO
  });
  describe("save multi stepper", () => {
    // TODO
  });
});
