describe("Todo app", () => {
  it("loads the page", () => {
    cy.server();
    //the route is in the xhr request in cypress
    cy.route("/api/todos",
      [
        {
          text: "Hello world",
          completed: false,
          id: 3,
        },
        {
          id: 4,
          completed: true,
          text: "Goodnight moon",
        },
      ]).as('preload');

    cy.visit("/");

    cy.wait('@preload');

    cy.get("[data-cy=todo-item-3]")
      .should("have.text", "Hello world")
      .should("not.have.class", "completed")
      .find(".toggle")
      .should("not.be.checked");

    cy.get("[data-cy=todo-item-4]")
      .should("have.text", "Goodnight moon")
      .should("have.class", "completed")
      .find(".toggle")
      .should("be.checked");
  });
});
