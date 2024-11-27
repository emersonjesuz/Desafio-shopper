import { interceptEstimateResponse } from "../intercepts/interceptEstimateResponse";
import { interceptRidesResponse } from "../intercepts/interceptRidesResponse";

describe("historic rides screen, error case", () => {
  it("Should appear a error if you click on search with an empty customer id field", () => {
    cy.visit("/");
    cy.intercept("POST", "/ride/estimate", {
      statusCode: 200,
      body: {
        origin: {
          latitude: -23.55052,
          longitude: -46.633308,
        },
        destination: {
          latitude: -22.909938,
          longitude: -47.062633,
        },
        distance: 0,
        duration: "",
        options: [
          {
            id: 1,
            description: "Carro igual nota de 3, todo falsificado!",
            name: "Dick vigarista",
            vehicle: "Uno sem escada",
            review: {
              rating: 3,
              comment: "Bom!",
            },
            value: 100,
          },
          {
            id: 2,
            description:
              "Ótimo em ultrapassagem, drift porem sempre da pau no carnaval!",
            name: "Neymar Jr",
            vehicle: "Ferrari",
            review: {
              rating: 5,
              comment: "Excelente!",
            },
            value: 100000,
          },
        ],
        routeResponse: {},
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

    cy.get("[data-cy=select-driver-card-name]").should("be.visible");
    cy.get("[data-cy=select-driver-card-button]")
      .first()
      .should("be.visible")
      .click();

    cy.get("[data-cy=historic-title]").should("be.visible");

    cy.get("[data-cy=historic-search-button]").should("be.visible").click();
    cy.get("[data-cy=error-message]").should("be.visible");
  });
});

describe("historic rides screen, success case", () => {
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

    cy.get("[data-cy=select-driver-card-name]").should("be.visible");
    cy.get("[data-cy=select-driver-card-button]")
      .first()
      .should("be.visible")
      .click();
  });
  it("Should be possible to view the historic screen", () => {
    cy.get("[data-cy=historic-title]").should("be.visible");

    cy.intercept("GET", "/ride/123?driver_id=", {
      statusCode: 200,
      body: {
        ...interceptRidesResponse(),
      },
    });

    cy.get("[data-cy=historic-input-customer-id]")
      .should("be.visible")
      .type("123");

    cy.get("[data-cy=historic-search-button]").should("be.visible").click();
    cy.get("[data-cy=historic-ride-card-driver-name]")
      .first()
      .should("be.visible");
  });
  it("Should be possible to view the historical screen, filtering by a driver", () => {
    cy.get("[data-cy=historic-title]").should("be.visible");

    cy.get("[data-cy=historic-input-customer-id]")
      .should("be.visible")
      .type("123");

    cy.get("[data-cy=historic-select-driver]")
      .should("be.visible")
      .select("Neymar Jr");

    cy.intercept("GET", "/ride/123?driver_id=2", {
      statusCode: 200,
      body: {
        customer_id: 123,
        rides: [interceptRidesResponse().rides[0]],
      },
    });

    cy.get("[data-cy=historic-search-button]").should("be.visible").click();

    cy.get("[data-cy=historic-ride-card-driver-name]")
      .first()
      .should("be.visible", "Neymar Jr");
  });
});
