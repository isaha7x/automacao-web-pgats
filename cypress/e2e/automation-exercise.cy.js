
/// <reference types="cypress"/>

const timesTamp = new Date().getTime()

import userData from '../fixtures/example.json'

import {
    getRandomNumber,
    getRandomEmail
} from '../support/helpers'

import { faker } from '@faker-js/faker'

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com')
        cy.get('a[href="/login"').click()
    });

    it('Cadastrar um usuário', () => {

        cy.get('[data-qa="signup-name"]').type('QA tester')

        cy.get('[data-qa="signup-email"]').type(getRandomEmail())

        cy.contains('button', 'Signup').click()

        cy.get('input[type=radio]').check('Mrs')

        cy.get('input#password').type('12345', { log: false })

        cy.get('[data-qa=days]').select('20')
        cy.get('[data-qa=months]').select('September')
        cy.get('[data-qa=years]').select('1992')

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type(faker.person.firstName())
        cy.get('input#last_name').type(faker.person.lastName())
        cy.get('input#company').type(`PGATS ${faker.company.name()}`)
        cy.get('input#address1').type(faker.location.streetAddress())
        cy.get('select#country').select('Canada')
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode()) // utilizando a inspeção do cypress
        cy.get('[data-qa="mobile_number"]').type('111 222 333')// utilizando a inspeção do cypress

        cy.get('[data-qa="create-account"]').click()

        // Assert

        cy.url().should('includes', 'account_created')

        cy.contains('b', 'Account Created!')
    });

    /// e mail: 
    it('Login do Usuário com email e senha corretos', () => {
        cy.get('[data-qa="login-email"]').type('qa-tester-1760562472318@test.com')
        cy.get('[data-qa="login-password"]').type('12345')
        cy.get('[data-qa="login-button"]').click()

        const nomeDoUsuario = "QA tester"

        cy.get('i.fa-user').parent().should('contain', nomeDoUsuario)
        cy.get('a[href="/logout"]').should('be.visible')

        cy.get(':nth-child(10) > a')
            .should('be.visible')
            .and('have.text', ` Logged in as ${nomeDoUsuario}`);

        cy.contains('b', nomeDoUsuario)
        cy.contains(`Logged in as ${nomeDoUsuario}`).should('be.visible')
    });

    it('Login do Usuário com email e senha corretos', () => {
        cy.get('[data-qa="login-email"]').type('qa-tester-1760562472318@test.com')
        cy.get('[data-qa="login-password"]').type('2345')
        cy.get('[data-qa="login-button"]').click()

        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
    });

    it('Logout de Usuário', () => {
        cy.get('[data-qa="login-email"]').type('qa-tester-1760562472318@test.com')
        cy.get('[data-qa="login-password"]').type('12345')

        cy.get('[data-qa="login-button"]').click()
        cy.get('i.fa-user').parent().should('contain', 'QA tester')

        cy.get('a[href="/logout"]').should('be.visible').click()

        cy.url().should('contain', 'login')
        cy.contains('Login to your account')

        cy.get('a[href="/logout"]').should('not.exist')
        cy.get('a[href="/login"]').should('contain', 'Signup / Login')
    });

    it('Cadastrar usuário com email existente no sistema', () => {
        cy.get('[data-qa="signup-name"]').type('QA tester')
        cy.get('[data-qa="signup-email"]').type('qa-tester-1760562472318@test.com')

        cy.contains('button', 'Signup').click()

        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')

    });

    it('Enviar um Formulario de Contato com upload de arquivo', () => {
        cy.get('a[href*=contact]').click()

        cy.get('[data-qa="name"]').type(userData.name)
        cy.get('[data-qa="email"]').type(userData.email)
        cy.get('[data-qa="subject"]').type(userData.subject)
        //cy.get('[data-qa="message"]').type(userData.message)

        cy.fixture('example.json').as('arquivo')

        cy.get('input[type=file]').selectFile('@arquivo')

        cy.get('[data-qa="submit-button"]').click()

        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')

    });

    /// <reference types="cypress-xpath" />

    /// <reference types="cypress" />
    /// <reference types="cypress-xpath" />
});


