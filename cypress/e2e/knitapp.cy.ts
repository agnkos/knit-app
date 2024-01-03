/// <reference types="cypress" />

describe('Knit app', function () {
  it('Login page is shown', function () {
    // cy.visit('http://localhost:5174/')
    cy.visit('/')
    cy.contains('Knit.app')
    cy.contains("If you don't have an account, sign up")
  })

  describe('Login page', function () {
    beforeEach(function () {
      // cy.visit('http://localhost:5174/')
      cy.visit('/')
    })

    it('logging in succeeds with correct credentials', function () {
      cy.get('input[type=email]').type('tester@email.com')
      cy.get('input[type=email]').should('have.value', 'tester@email.com')
      cy.get('input[type=password]').type('testapp123')
      cy.get('input[type=password]').should('have.value', 'testapp123')
      cy.get('button').click()

      cy.get('h1').should('contain', 'Projects')
    })

    it('logging in fails with incorrect password', function () {
      cy.get('input[type=email]').type('tester@email.com')
      cy.get('input[type=password]').type('wrongpassword')
      cy.get('button').click()

      cy.get('pre').should('contain', 'wrong password')
    })

    it('logging in fails with incorrect email', function () {
      cy.get('input[type=email]').type('wrongemail@email.com')
      cy.get('input[type=password]').type('testapp123')
      cy.get('button').click()

      cy.get('pre').should('contain', 'wrong user')
    })
  })

  describe('Signup page', function () {
    beforeEach(function () {
      // cy.visit('http://localhost:5174/')
      cy.visit('/')
      cy.get('a').should('contain', 'sign up').click()
    })

    it('Signup page is shown', function () {
      cy.url().should('contain', 'http://localhost:5174/signup')
      cy.get('button').should('contain', 'Create an account')
    })

    it.skip('Creating an account with correct values', function () {
      cy.get("input[placeholder='Username']").type('knittinghamster')
      cy.get("input[placeholder='Email adress']").type('knitting@email.com')
      cy.get("input[placeholder='Password']").type('knitting1234')
      cy.get("input[placeholder='Repeat password']").type('knitting1234')
      cy.get('button').click()
      cy.get('h1').should('contain', 'Projects')
    })

    it('Signing up fails with password length less than 6', function () {
      cy.get("input[placeholder='Username']").type('knittinghamster')
      cy.get("input[placeholder='Email adress']").type('knitting@email.com')
      cy.get("input[placeholder='Password']").type('short')
      cy.get("input[placeholder='Repeat password']").type('short')

      cy.get('Form').should('contain', 'Password must be 6 characters long or more')
    })

    it('Signing up fails when passwords do not match', function () {
      cy.get("input[placeholder='Username']").type('knittinghamster')
      cy.get("input[placeholder='Email adress']").type('knitting@email.com')
      cy.get("input[placeholder='Password']").type('password')
      cy.get("input[placeholder='Repeat password']").type('passwort')
      cy.get('button').click()
      cy.get('Form').should('contain', "Passwords don't match")
    })
  })

  describe('Projects page', function () {
    beforeEach(function () {
      cy.login('tester@email.com', 'testapp123')
    })
  })
})

