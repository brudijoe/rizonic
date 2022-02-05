describe("customer flow", () => {
  it("should visit localhost", () => {
    cy.visit("http://localhost:3000/", { failOnStatusCode: false });
  });
});
