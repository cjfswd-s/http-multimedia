describe('Assets - Server', () => {
    it('fetches All Assets - GET', () => {
        cy.task('getAllStaticAssets').then(assets =>
            assets.forEach(async (item, index) => {
                await cy.request(item).as(`assetRequest${index}`);
                await cy.get(`@assetRequest${index}`).then(asset => {
                    expect(asset.status).to.eq(200);
                });
            }),
        )
    });
});