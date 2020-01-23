describe('page', () => {
    it('xhr test', () => {
        cy.server();

        cy.route({ method: 'DELETE', url: /\/candidates\/46336\?/, status: 204 }).as('deleteCandidate');

        cy.window().then(win => {
            var request = new win.XMLHttpRequest()
            
            request.open('DELETE',
                'https://cy-test.free.beeceptor.com/candidates/46336?foo=bar',
                true);
            request.send();

            cy.wait('@deleteCandidate').then(xhr => {
                console.log(xhr);
                const status = xhr.response.statusCode;
                expect(status).to.be.equal(204);
            })
        })
    })
});