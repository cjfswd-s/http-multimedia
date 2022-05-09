// api.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Multimedia - API', () => {
    it('fetches Video data - GET', () => {
        cy.request('/api/videos').as('videoRequest');
        cy.get('@videoRequest').then(videos => {
            expect(videos.status).to.eq(200);
            assert.isArray(videos.body, 'videoRequest Response is an array')
        });
    });

    it('fetches Audio data - GET', () => {
        cy.request('/api/audios').as('audioRequest');
        cy.get('@audioRequest').then(audios => {
            expect(audios.status).to.eq(200);
            assert.isArray(audios.body, 'audioRequest Response is an array')
        });
    });

    it('fetches Image data - GET', () => {
        cy.request('/api/images').as('imageRequest');
        cy.get('@imageRequest').then(audios => {
            expect(audios.status).to.eq(200);
            assert.isArray(audios.body, 'imageRequest Response is an array')
        });
    });
});