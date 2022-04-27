
describe("Appointments", () => {

  beforeEach(() => {

    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");

  });

  it.skip("should book an interview", () => {

    cy.get('[alt=Add]').first().click();
    cy.get('[data-testid=student-name-input]').type('Lydia Miller-Jones');
    cy.get('[alt="Sylvia Palmer"]').click();
    cy.get('button').contains('Save').click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  it.skip("should edit an interview", () => {

    cy.get('[alt=Edit]').first().invoke('show').click();
    cy.get('[data-testid=student-name-input]').clear().type('Patricia Davidson');
    cy.get('[alt="Tori Malcolm"]').click();
    cy.get('button').contains('Save').click();
    cy.contains(".appointment__card--show", "Patricia Davidson");
    cy.contains(".appointment__card--show", "Tori Malcolm");

  });

  it("should cancel an interview", () => {

    cy.get('[alt=Delete]').first().invoke('show').click();
    cy.contains('button', 'Confirm').click();
    cy.contains('Deleting').should('exist');
    cy.contains('Deleting').should('not.exist');
    cy.contains(".appointment__card--show", "Archie Cohen").should('not.exist');

  });

});