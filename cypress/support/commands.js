const FRONTEND_URL = 'http://localhost:5173'
const TEST_EMAIL = 'bachthanhvinh12@gmail.com'
const TEST_PASSWORD = '12345678a'

Cypress.Commands.add('login', () => {
  cy.visit(`${FRONTEND_URL}/login`)
  cy.get('input[name="email"]').clear().type(TEST_EMAIL)
  cy.get('input[name="password"]').clear().type(TEST_PASSWORD)
  cy.get('button[type="submit"]').click()
  cy.location('pathname', { timeout: 10000 }).should('eq', '/boards')
})

Cypress.Commands.add('dragTo', { prevSubject: 'element' }, (subject, targetSelector) => {
  cy.wrap(subject).then(($source) => {
    const sourceRect = $source[0].getBoundingClientRect()
    const startX = sourceRect.left + sourceRect.width / 2
    const startY = sourceRect.top + sourceRect.height / 2

    cy.get(targetSelector).then(($target) => {
      const targetRect = $target[0].getBoundingClientRect()
      const endX = targetRect.left + targetRect.width / 2
      const endY = targetRect.top + targetRect.height / 2

      cy.wrap($source)
        .trigger('pointerdown', { button: 0, clientX: startX, clientY: startY, force: true })
        .trigger('mousedown', { button: 0, clientX: startX, clientY: startY, force: true })
        .trigger('mousemove', { button: 0, clientX: startX + 15, clientY: startY + 15, force: true })

      cy.get(targetSelector)
        .trigger('pointermove', { button: 0, clientX: endX, clientY: endY, force: true })
        .trigger('mousemove', { button: 0, clientX: endX, clientY: endY, force: true })

      cy.wait(200)
      cy.get('body').trigger('pointerup', { button: 0, force: true })
    })
  })
})
