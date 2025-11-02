
/// <reference types="cypress"/>

const timesTamp = new Date().getTime()

import userData from '../fixtures/example.json'
import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com')
        menu.navegarParaLogin()  
    });

    it('Cadastrar um usuário', () => {
        login.preencherFormularioDePreCadastro()
        cadastro.preencherFormularioDeCadastroCompleto()
        // radio ou checkboxes -> check
        // cy.get ('#id_gender1').check()

    cy.contains('b','Account Created!')
    
    });

    it('Login do Usuário com email e senha corretos', () => {

        //cy.get('[data-qa="login-email"]').type('qa-tester-1760562472318@test.com')
        //cy.get('[data-qa="login-password"]').type('12345')
        //cy.get('[data-qa="login-button"]').click()
        login.preencherFormularioDeLogin(userData.user,userData.password)
        //const nomeDoUsuario = "QA tester"

        cy.get('i.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible')

        cy.get(':nth-child(10) > a')
        .should('be.visible')
        .and('have.text', ` Logged in as ${userData.name}`);

        cy.contains('b',userData.name)
        cy.contains(`Logged in as ${userData.name}`).should('be.visible')
    });

    it('Login do Usuário com email e senha incorretos', () => {
        //cy.get('[data-qa="login-email"]').type('qa-tester-1760562472318@test.com')
        //cy.get('[data-qa="login-password"]').type('2345')
        //cy.get('[data-qa="login-button"]').click()
        login.preencherFormularioDeLogin(userData.user,'2564')
        console.log(userData.user)

        cy.get('.login-form > form > p').should('contain','Your email or password is incorrect!')
        
    });

    it('Logout de Usuário', () => {
        //cy.get('[data-qa="login-email"]').type('qa-tester-1760562472318@test.com')
        //cy.get('[data-qa="login-password"]').type('12345')
        
        //cy.get('[data-qa="login-button"]').click()
        login.preencherFormularioDeLogin(userData.user,userData.password)
        
        //cy.get('i.fa-user').parent().should('contain', 'QA tester')
        menu.efetuarLogout()

        cy.get('a[href="/logout"]').should('be.visible').click()

        cy.url().should('contain', 'login')
        cy.contains('Login to your account')

        cy.get('a[href="/logout"]').should('not.exist')
        cy.get('a[href="/login"]').should('contain','Signup / Login')
    });

    it('Cadastrar usuário com email existente no sistema', () => {
        cy.get('[data-qa="signup-name"]').type('QA tester')
        cy.get('[data-qa="signup-email"]').type('qa-tester-1760562472318@test.com')

        cy.contains('button','Signup').click()

        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
    });

    it.only('Enviar um Formulario de Contato com upload de arquivo', () => {
        cy.get ('a[href*=contact]').click()
        
        cy.get('[data-qa="name"]').type(userData.name)
        cy.get('[data-qa="email"]').type(userData.email)
        cy.get('[data-qa="subject"]').type(userData.subject)
        //cy.get('[data-qa="message"]').type(userData.message)

        cy.fixture('example.json').as('arquivo')

        cy.get('input[type=file]').selectFile('@arquivo')

        cy.get('[data-qa="submit-button"]').click()

        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text','Success! Your details have been submitted successfully.') 
    });
});