/// <reference types="Cypress" />
describe("new", () => {
  it("visit localhost", () => {
    cy.visit("http://localhost:3000/new", { failOnStatusCode: false });
  });

  describe("add customer in multi stepper", () => {
    it("find customer name input", () => {
      cy.get('[data-cy="customername-label"]').should("exist");
    });
    it("fill customer name input", () => {
      cy.get('[data-cy="add-customer-input"]').type("Example Customer");
    });
    it("click next button", () => {
      cy.get('[data-cy="add-customer-next-button"]').click();
    });
  });
  describe("add project in multi stepper", () => {
    it("find project name input", () => {
      cy.get('[data-cy="projectname-label"]').should("exist");
    });
    it("fill project name input", () => {
      cy.get('[data-cy="add-project-input"]').type("Example Project");
    });
    it("click next button", () => {
      cy.get('[data-cy="add-project-next-button"]').click();
    });
  });
  describe("add task in multi stepper", () => {
    it("find task name input", () => {
      cy.get('[data-cy="taskname-label"]').should("exist");
    });
    it("fill task name input", () => {
      cy.get('[data-cy="add-task-input"]').type("Example Task");
    });
  });
  describe("save multi stepper", () => {
    it("click save button", () => {
      cy.get('[data-cy="save-task-next-button"]').click();
    });
  });

  describe("check newly added customer", () => {
    it("click customers icon", () => {
      cy.get('[data-cy="sidebar-customers-icon"]').click();
    });

    it("check if example customer exists", () => {
      cy.get('[data-cy="customer-name"]').contains("Example Customer");
    });

    it("open project dropdown", () => {
      cy.get('[data-cy="open-project-dropdown"]').last().click();
      cy.get('[data-cy="project-information"]').should("exist");
    });

    it("check if example project exists", () => {
      cy.get('[data-cy="project-name"]').contains("Example Project");
    });
    it("check if example task exists", () => {
      cy.get('[data-cy="edit-task-input-save"]').contains("Example Task");
    });
  });
});
