import { faker } from '@faker-js/faker'
import userData from '../../fixtures/example.json'

import {
    getRandomNumber,
    getRandomEmail
} from '../../support/helpers'

class Login {
    preencherFormularioDePreCadastro() {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()

        cy.get('[data-qa="signup-name"]').type(`${firstName} ${lastName}`)
        cy.get('[data-qa="signup-email"]').type(getRandomEmail())

        cy.contains('button', 'Signup').click()
    }

    preencherFormularioDeLogin(user, pass) {
        cy.get('[data-qa="login-email"]').type(user)
        cy.get('[data-qa="login-password"]').type(pass)
        cy.get('[data-qa="login-button"]').click()
    }

    registrarUsuarioComEmailExistente(user, email) {
        cy.get('[data-qa="signup-name"]').type(user)
        cy.get('[data-qa="signup-email"]').type(email)
        cy.get('button[data-qa="signup-button"]').click()
    }

    preencherFormularioDeLoginDeExclusao() {
        cy.get('[data-qa="signup-name"]').type(userData.nameexclusao)
        cy.get('[data-qa="signup-email"]').type(getRandomEmail())
        cy.contains('button', 'Signup').click()
    }

    clicarEmExcluirConta() {
        cy.get('a[href="/delete_account"]').click()
    }

    clicarNoBotãoContinuarAoExcluirConta() {
        cy.get('[data-qa="continue-button"]').click()
    }
}

export default new Login()