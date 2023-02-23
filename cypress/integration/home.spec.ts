describe('Home', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.init();
		cy.server();
	});

	it('should be able to show success toast if trigger sample api sucesss', () => {
		cy.route('GET', /\/sample\/api/, {
			success: true,
			data: {
				message: 'Success !',
			},
		});
	});

	it('should be able to trigger POST Api', () => {
		cy.route('POST', /\/sample\/api/, {
			success: false,
			response_code: 404,
			message: 'Failed !',
		});
	});

	it('should be able to show error toast if trigger sample api fails', () => {
		cy.route('GET', /\/sample\/api/);
	});
});
