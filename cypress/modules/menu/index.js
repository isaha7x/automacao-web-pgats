class Menu {
  navegarParaLogin() {
    cy.get('a[href="/login"]').click()
  }

  efetuarLogout() {
    cy.get('a[href="/logout"]').should('be.visible').click()

  }

  navegarParaCarrinho() {
    cy.get('a[href="/view_cart"]').contains('Cart').click({ force: true })
  }
}

export default new Menu()