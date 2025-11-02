class Carrinho {
    clicarNoBotaoProsseguir() {
        cy.get('.btn.btn-default.check_out').click()
    }

    inserirComentarioPedido() {
        cy.get('.form-control').type('Fazer pedido')
    }

    clicarNoBotaoFazerPedido() {
        cy.get('a[href="/payment"]').should('contain', 'Place Order').click()
    }
}

export default new Carrinho()