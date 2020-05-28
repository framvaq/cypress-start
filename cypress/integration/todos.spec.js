describe("Todo app", () => {
  it("loads the page", () => {
    cy.server();

    /*
  Mock the route to create a new todo, and reply with a 200
  Mock the route to edit an existing todo, and reply with a 200
*/

    //the route is in the xhr request in cypress
    cy.route("/api/todos", [
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
    ]).as("preload");

    cy.visit("/");

    cy.wait("@preload");

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

    cy.route("/api/todos", [
      {
        text: "Hello Mars",
        completed: false,
        id: 3,
      },
      {
        text: "Goodnight moon",
        completed: true,
        id: 4,
      },
      {
        text: "sfsdfsd",
        completed: false,
        id: 5,
      },
    ]).as("modified");

    cy.visit("/");

    cy.wait("@modified");

    cy.get("[data-cy=todo-item-3]")
      .should("have.text", "Hello Mars");
    
      cy.route("/api/todos", [
      {
        text: "Hello Mars",
        completed: false,
        id: 3,
      },
      {
        text: "Goodnight moon",
        completed: true,
        id: 4,
      },
      {
        text: "sfsdfsd",
        completed: false,
        id: 5,
      },
      {
        text:"new one",
        completed: true,
        id: 6,
      }
    ]).as("added");

    cy.visit("/");

    cy.wait("@added");

    cy.get("[data-cy=todo-item-6]")
      .should("have.text", "new one");


  });
});
