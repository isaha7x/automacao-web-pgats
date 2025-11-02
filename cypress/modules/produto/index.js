class Produto {
    clicarMenuProdutos() {
        cy.get('a[href="/products"]').click()
        cy.url().should('include', '/products')
        cy.get('.title.text-center').should('contain', 'All Products')
    }

    verificarListaDeProdutosVisivel() {
        cy.get('.features_items .product-image-wrapper')
            .should('have.length.greaterThan', 0)
    }

    clicarVerProdutoPrimeiroProduto() {
        cy.get('a[href="/product_details/1"]').click()
    }

    realizarPesquisa() {
        cy.get('#search_product').type('Men')
        cy.get('#submit_search').click()
        cy.contains('Searched Products').should('be.visible')

    }

    adicionarProdutosNoCarrinho() {
        cy.get('[data-product-id="1"]').first().click()
        cy.get('.close-modal').click()

        cy.get('[data-product-id="2"]').first().scrollIntoView().click()
        cy.get('.close-modal').click()
    }

    verificarProdutosPesquisadosVisiveis() {
        cy.get('.features_items .product-image-wrapper')
            .should('have.length.greaterThan', 0)
            .each(($el) => {
                cy.wrap($el).should('be.visible')
            })
    }
}

export default new Produto()