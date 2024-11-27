import { interceptEstimateResponse } from "../intercepts/interceptEstimateResponse";

describe("Estimation screen, error case", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("POST", "/ride/estimate", {
      statusCode: 400,
      body: {
        error_code: "INVALID_DATA",
        error_description:
          "Os dados fornecidos no corpo da requisição são inválidos",
      },
    });
  });

  it("Should be possible to see errors when clicking confirm, with empty fields", () => {
    cy.get("[data-cy=estimate-image-car]").should("be.visible");

    cy.get("[data-cy=estimate-input-customer-id]").should("be.visible");
    cy.get("[data-cy=estimate-input-origin]").should("be.visible");
    cy.get("[data-cy=estimate-input-destination]").should("be.visible");

    cy.get("[data-cy=estimate-button-confirm]").should("be.visible").click();

    cy.get("[data-cy=estimate-customer-id-error]").should("be.visible");
    cy.get("[data-cy=estimate-origin-error]").should("be.visible");
    cy.get("[data-cy=estimate-destination-error]").should("be.visible");
  });

  it("Should be possible to see an error screen if the fields are invalid", () => {
    cy.get("[data-cy=estimate-image-car]").should("be.visible");

    cy.get("[data-cy=estimate-input-customer-id]")
      .should("be.visible")
      .type("  ");
    cy.get("[data-cy=estimate-input-origin]").should("be.visible").type("  ");
    cy.get("[data-cy=estimate-input-destination]")
      .should("be.visible")
      .type(" ");

    cy.get("[data-cy=estimate-button-confirm]").should("be.visible").click();

    cy.get("[data-cy=error-message]").should("be.visible");

    cy.get("[data-cy=error-button]").should("be.visible").click();

    cy.get("[data-cy=estimate-input-customer-id]")
      .should("be.visible")
      .type("123");
    cy.get("[data-cy=estimate-input-origin]").should("be.visible").type("  ");
    cy.get("[data-cy=estimate-input-destination]")
      .should("be.visible")
      .type(" ");

    cy.get("[data-cy=estimate-button-confirm]").should("be.visible").click();

    cy.get("[data-cy=error-message]").should("be.visible");

    cy.get("[data-cy=error-button]").should("be.visible").click();

    cy.get("[data-cy=estimate-input-customer-id]")
      .should("be.visible")
      .type("111");
    cy.get("[data-cy=estimate-input-origin]")
      .should("be.visible")
      .type("são paulo");
    cy.get("[data-cy=estimate-input-destination]")
      .should("be.visible")
      .type(" ");

    cy.get("[data-cy=estimate-button-confirm]").should("be.visible").click();

    cy.get("[data-cy=error-message]").should("be.visible");

    cy.get("[data-cy=error-button]").should("be.visible").click();
  });
});

describe("Estimation screen, success case", () => {
  beforeEach(() => {});

  it("Should be possible to view all drivers if all fields are ok", () => {
    cy.visit("/");

    cy.intercept("POST", "/ride/estimate", {
      statusCode: 200,
      body: {
        ...interceptEstimateResponse(),
      },
    });

    cy.get("[data-cy=estimate-image-car]").should("be.visible");

    cy.get("[data-cy=estimate-input-customer-id]")
      .should("be.visible")
      .type("123");
    cy.get("[data-cy=estimate-input-origin]")
      .should("be.visible")
      .type("Rua alto novo, centro, Macururé - Bahia");
    cy.get("[data-cy=estimate-input-destination]")
      .should("be.visible")
      .type("Rua Landolfo Alves, 144, Paulo Afonso - Bahia");

    cy.get("[data-cy=estimate-button-confirm]").should("be.visible").click();

    cy.get("[data-cy=select-drivers-title]").should("be.visible");
  });
});
