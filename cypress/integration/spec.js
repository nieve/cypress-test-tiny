describe('page', () => {
    it('xhr test', () => {
        cy.server();

        // variant 1
        // cy.fixture('images/map.jpeg').then(dataURI => {
        //     console.log(dataURI);
        //     return Cypress.Blob.base64StringToBlob(dataURI, "image/jpeg").then(
        //         (blob) => {
        //             console.log(blob);
        //             expect(blob.size).to.be.equal(41191);
        //             expect(blob.type).to.equal('image/jpeg');
        //             return cy.route('GET',
        //                 'https://images.agilitycoursemaster.com/**',
        //                 blob).as('imageXHR');
        //         })
        // });

        // variant 2
        // cy.fixture('images/map.jpeg').as('map');
        // cy.route('https://images.agilitycoursemaster.com/**', '@map').as('imageXHR');

        // variant 3
        cy.route('https://images.agilitycoursemaster.com/**', 'fx:images/map.jpeg')
            .as('imageXHR');

        // confirm it calls wait() - FAILS due to 403 from actual server
        // cy.route('https://images.agilitycoursemaster.com/**')
        //     .as('imageXHR');

        cy.window().then(win => {
            var request = new win.XMLHttpRequest()
            request.responseType = "blob";
            request.open('GET',
                'https://images.agilitycoursemaster.com/?url=https://upload.wikimedia.org/wikipedia/en/f/f9/AgilityCoursemapForPhotosInArticle.gif&fmt=jpeg&w=1024&h=1024&q=30&mode=clip&client=acmaster&sig=9742b8786e2e81adaabd448ea6e5daa96e4fd2ce',
                true);
            request.send();

            cy.wait('@imageXHR').then(xhr => {
                console.log(xhr);
                const blob = xhr.response.body;
                expect(blob.size).to.be.equal(41191);
                expect(blob.type).to.equal('image/jpeg')
            })
        })
    })
});