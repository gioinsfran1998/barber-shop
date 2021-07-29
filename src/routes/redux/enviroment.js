const defaultState = {
	showLayout: true,
};

const enviromentAction = (state = defaultState, action = {}) => {
	switch (action.type) {
		case 'SHOW_LAYOUT':
			return {
				...state,
				showLayout: action.payload,
			};

		default:
			return state;
	}
};

export const showLayoutAction = (value) => {
	return {
		type: 'SHOW_LAYOUT',
		payload: value,
	};
};

export default enviromentAction;
