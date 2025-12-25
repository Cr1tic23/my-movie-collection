describe('Movie App Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('MyMovieCollection'); // Перевіряємо заголовок
    cy.get('.movie-card', { timeout: 10000 }).should('exist'); // Чекаємо на фільми з Firebase
  });
});
