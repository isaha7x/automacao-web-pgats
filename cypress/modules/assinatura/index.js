
import userData from '../../fixtures/example.json'

class Assinatura {
    rolarFimDaPaginaInicial() {
        cy.scrollTo('bottom')
    }

    inserirEmailEEnviar() {
        cy.get('#susbscribe_email').type(userData.email)
        cy.get('button#subscribe').click()
    }
}

export default new Assinatura()