/// <reference types="Cypress" />
describe("check sidebar routes", () => {
  it("visit localhost", () => {
    cy.visit("http://localhost:3000/", { failOnStatusCode: false });
  });

  it("check default route", () => {
    cy.contains("Customers");
  });

  it("check new route", () => {
    cy.visit("http://localhost:3000/new", {
      failOnStatusCode: false,
    }).contains("New");
  });

  it("check employee route", () => {
    cy.visit("http://localhost:3000/employees", {
      failOnStatusCode: false,
    }).contains("Employees");
  });

  it("check customer route", () => {
    cy.visit("http://localhost:3000/customers", {
      failOnStatusCode: false,
    }).contains("Customers");
  });

  it("check statistics route", () => {
    cy.visit("http://localhost:3000/statistics", {
      failOnStatusCode: false,
    }).contains("Statistics");
  });
});
