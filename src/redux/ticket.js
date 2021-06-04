const defaultState = {
	ticketState: null,
};

const ticketAction = (state = defaultState, action = {}) => {
	switch (action.type) {
		case 'TICKET_CHANGE_SUCCESS':
			return {
				...state,
				ticketState: action.payload,
			};

		default:
			return state;
	}
};

export const ticketChangeState = (value) => {
	return {
		type: 'TICKET_CHANGE_SUCCESS',
		payload: value,
	};
};

export default ticketAction;
