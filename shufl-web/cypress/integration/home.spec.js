context('Home Tests', () => {
    beforeEach(() => {
        cy.visit('');
    });
  
    it('should visit home page', () => {
        cy.contains('Random Track')
    });
});
