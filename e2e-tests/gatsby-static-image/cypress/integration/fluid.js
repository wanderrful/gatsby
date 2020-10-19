const fluidTestId = `image-fluid`

describe(`fluid`, () => {
  beforeEach(() => {
    cy.visit(`/fluid`).waitForRouteChange()
  })

  it(`works on png files`, () => {
    cy.getTestElement(`image-fluid-png`)
      .find(`.gatsby-image-wrapper`)
      .should(`exist`)
  })

  it(`works on relative paths outside of src`, () => {
    cy.getTestElement(`image-fluid-relative`)
      .find(`.gatsby-image-wrapper`)
      .should(`exist`)
  })

  it(`renders a spacer div`, () => {
    cy.getTestElement(fluidTestId)
      .find(`.gatsby-image-wrapper > div`)
      .should(`have.attr`, `style`)
      .and(`match`, /padding/)
  })
})
