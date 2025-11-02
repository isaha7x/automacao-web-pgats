import userData from '../../fixtures/example.json'


class Pagamento {
    inserirDadosDoCartao() {
        cy.get('[data-qa="name-on-card"]').type(userData.name)
        cy.get('[data-qa="card-number"]').type(userData.numbercard)
        cy.get('[data-qa="cvc"]').type(userData.cvc)
        cy.get('[data-qa="expiry-month"]').type(userData.expirationmonth)
        cy.get('[data-qa="expiry-year"]').type(userData.expirationyear)

    }

    pagarEConfirmarPedido() {
        cy.get('[data-qa="pay-button"]').click()
    }

}

export default new Pagamento()