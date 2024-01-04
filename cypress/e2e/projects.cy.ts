describe('Projects page', function () {
    beforeEach(function () {
        // cy.session('loginsession', function () { cy.login('tester@email.com', 'testapp123') })
        cy.login('tester@email.com', 'testapp123')
        // cy.visit('/')
    })

    it('Project page is displayed', function () {
        // cy.visit('/')
        cy.get('h1').should('contain', 'Projects')
    })

    it('Adding a new project', function () {
        cy.contains('new project').click()
        cy.get('input[name="name"]').type('new sweater')
        cy.get('input[name="pattern"]').type('sweater pattern')
        cy.contains('Create project').click()
        cy.get('html').should('contain', 'new sweater')
    })

    it('Editing a project', function () {
        cy.contains('new sweater').click()
        cy.contains('edit').click()
        cy.get('input[name="name"]').clear().type('changed sweater name')
        cy.contains('Save').click()
        cy.get('html').should('contain', 'Back to projects')
        cy.get('html').should('contain', 'changed sweater name')

    })

    it.skip('Deleting a project', function () {
        cy.contains('new sweater').click()
        cy.contains('edit').click()
        cy.contains('Delete Project').click()
        cy.get('button').contains('Delete').click()
        cy.url().should('equal', 'http://localhost:5173/projects')
        cy.get('html').should('not.contain', 'Loading')
        cy.get('html').should('not.contain', 'new sweater')
    })
})