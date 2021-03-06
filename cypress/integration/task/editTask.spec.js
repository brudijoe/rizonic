/// <reference types="Cypress" />
describe("edit task", () => {
  it("visit localhost", () => {
    cy.visit("http://localhost:3000/", { failOnStatusCode: false });
  });

  it("open project dropdown", () => {
    cy.get('[data-cy="open-project-dropdown"]').first().click();
    cy.get('[data-cy="project-information"]').should("exist");
  });
  describe("edit task-name", () => {
    it("check if first task id exists", () => {
      cy.get('[data-cy="task-id-tbody"]').first().contains(1);
    });

    it("click first edit button", () => {
      cy.get('[data-cy="edit-task-button"]').first().click();
    });
    it("change task-name", () => {
      cy.get('[data-cy="edit-task-input"]').clear().type("Buy Seeds");
    });

    it("save task name changes", () => {
      cy.get('[data-cy="edit-task-button-save"]').first().click();
    });
    it("check task-name changes", () => {
      cy.get('[data-cy="edit-task-input-save"]').contains("Buy Seeds");
    });
  });
  describe("edit task-status", () => {
    it("click first edit button again", () => {
      cy.get('[data-cy="edit-task-button"]').first().click();
    });
    it("change task-status to On hold", () => {
      cy.get('[data-cy="edit-task-select"]').select(2);
    });
    it("save task status changes", () => {
      cy.get('[data-cy="edit-task-button-save"]').first().click();
    });
    it("check task-status changes", () => {
      cy.get('[data-cy="edit-task-select-save"]').contains("On hold");
    });
  });

  describe("edit employee", () => {
    it("click first edit button again", () => {
      cy.get('[data-cy="edit-task-button"]').first().click();
    });
    it("change employee to Ingo", () => {
      cy.get('[data-cy="edit-employee-select"]').select(1);
    });
    it("save employee changes", () => {
      cy.get('[data-cy="edit-task-button-save"]').first().click();
    });
    it("check employee changes", () => {
      cy.get('[data-cy="edit-employee-select-save"]').contains("Ingo");
    });

    describe("change employee", () => {
      it("click first edit button again again", () => {
        cy.get('[data-cy="edit-task-button"]').first().click();
      });
      it("change employee to Bob", () => {
        cy.get('[data-cy="edit-employee-select"]').select(2);
      });
      it("save employee changes again", () => {
        cy.get('[data-cy="edit-task-button-save"]').first().click();
      });
      it("check employee changes again", () => {
        cy.get('[data-cy="edit-employee-select-save"]').contains("Bob");
      });
    });
  });
});
