describe('Projects page', function () {
    beforeEach(function () {
        cy.visit('/')
        cy.login('tester@email.com', 'testapp123')
    })

    it('Project page is displayed', function() {
        cy.get('h1').should('contain', 'Projects')
    })
})