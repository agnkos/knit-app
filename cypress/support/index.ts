// Cypress.Commands.add('login', (email: string, password: string) => {
//     cy.visit('/')
//     cy.get('input[type=email]').type(email)
//     cy.get('input[type=password]').type(`${password}{enter}`, { log: false })
//     cy.url().should('include', '/projects')
//     cy.get('h1').should('contain', 'Projects')
// })

// export { }

// declare global {
//     // eslint-disable-next-line @typescript-eslint/no-namespace
//     namespace Cypress {
//         interface Chainable {
//             login: (email: string, password: string) => Chainable<JQuery<HTMLElement>>
//         }
//     }
// }
