describe('App Info', () => {
	beforeEach(() => {
		cy.visit('/?token=JDHJAHSDW3627236HD&latitude=79&longitude=79');
		cy.server();
		cy.init();
	});

	it('should be able to load app info', () => {
		cy.visit('/?token=JDHJAHSDW3627236HD&latitude=79&longitude=79');
		cy.location('pathname').should('eq', '/');
	});
});
