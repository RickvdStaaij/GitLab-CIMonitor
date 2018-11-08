context('Waiting', () => {
    it('opens the dashboard', () => {
        cy.visit('/');
    });

    it('clears the dashboard', () => {
        cy.request('/status/clear-all');
    });

    it('pushes custom statuses', () => {
        cy.get('.toolbar');
        cy.pushStatus('custom-status-1-success.json');
        cy.wait(1000);
        cy.pushStatus('custom-status-2-started.json');
        cy.wait(1000);
        cy.pushStatus('custom-status-3-success.json');
        cy.wait(1000);
        cy.pushStatus('custom-status-2-success.json');
    });

    it('pushes a successful gitlab pipeline', () => {
        for (let i = 1; i <= 27; i++) {
            cy.pushGitLabWebHook(`master-pipeline-success/${i}.json`);
            cy.wait(1000);
        }
    });
});
