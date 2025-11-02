
import userData from '../../fixtures/example.json'

class Contato {
    preencherFormularioDeContato() {
        cy.get('a[href*=contact]').click()

        cy.get('[data-qa="name"]').type(userData.name)
        cy.get('[data-qa="email"]').type(userData.email)
        cy.get('[data-qa="subject"]').type(userData.subject)
        cy.get('[data-qa="message"]').type('Oie, teste teste')

        cy.fixture('example.json').as('arquivo')

        cy.get('input[type=file]').selectFile('@arquivo')

        cy.get('[data-qa="submit-button"]').click()
        cy.get('.status').should('be.visible')
    }
}

export default new Contato()