export function getRoleObject(role : string) {

	if(!role) return;

	switch (role) {
		case 'customer':
			return {
				customer: {}
			};
		case 'vendor':
			return {
				vendor: {}
			};
		case 'both':
			return {
				customer: {},
				vendor: {}
			};
		default:
			return;
	}

}
