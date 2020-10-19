before(() => {
  cy.exec(
    `npm run update -- --file src/pages/error-handling/compile-error.js --restore`
  )
})

after(() => {
  cy.exec(
    `npm run update -- --file src/pages/error-handling/compile-error.js --restore`
  )
})

const errorPlaceholder = `// compile-error`
const errorReplacement = `a b`

describe(`testing error overlay and ability to automatically recover from webpack compile errors`, () => {
  it(`displays content initially (no errors yet)`, () => {
    cy.visit(`/error-handling/compile-error/`).waitForRouteChange()
    cy.getTestElement(`hot`).invoke(`text`).should(`contain`, `Working`)
  })

  it(`displays error with overlay on compilation errors`, () => {
    cy.exec(
      `npm run update -- --file src/pages/error-handling/compile-error.js --replacements "${errorPlaceholder}:${errorReplacement}" --exact`
    )

    cy.getOverlayIframe().contains(`Failed to compile`)
    cy.getOverlayIframe().contains(`Parsing error: Unexpected token`)
    cy.screenshot()
  })

  it(`can recover without need to refresh manually`, () => {
    cy.exec(
      `npm run update -- --file src/pages/error-handling/compile-error.js --replacements "Working:Updated" --replacements "${errorReplacement}:${errorPlaceholder}" --exact`
    )

    cy.getTestElement(`hot`).invoke(`text`).should(`contain`, `Updated`)
    cy.assertNoOverlayIframe()
    cy.screenshot()
  })
})
