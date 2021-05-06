const defaultState = {
	logged: false,
};

const authAction = (state = defaultState, action = {}) => {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			return {
				...state,
				logged: true,
			};
		case 'LOGOUT_SUCCESS':
			return {
				logged: false,
			};

		default:
			return state;
	}
};

export default authAction;
