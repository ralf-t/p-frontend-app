describe('My First Test', () => {
  it('visit home page', () => {
    cy.visit('http://localhost:5173')
    cy.contains('FreediveVault')
  })

  it('use freediver name search', () => {
    cy.visit('http://localhost:5173')
    cy.contains('Search').click()
    
  })
})