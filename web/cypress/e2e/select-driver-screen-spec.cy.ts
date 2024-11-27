import { interceptEstimateResponse } from "../intercepts/interceptEstimateResponse";

describe("select driver screen, success case", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("POST", "/ride/estimate", {
      statusCode: 200,
      body: {
        ...interceptEstimateResponse(),
      },
    });

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

    cy.intercept("PATCH", "/ride/confirm", {
      statusCode: 200,
      body: {
        success: true,
      },
    });
  });

  it("Should be possible to view the trip history screen", () => {
    cy.get("[data-cy=select-drivers-title]").should("be.visible");
    cy.get("[data-cy=select-driver-card-name]").should("be.visible");
    cy.get("[data-cy=select-driver-card-button]")
      .first()
      .should("be.visible")
      .click();
    cy.get("[data-cy=historic-title]").should("be.visible");
  });
});
