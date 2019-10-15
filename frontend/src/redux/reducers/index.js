const initialState = {
	users: [],
	filers: [],
	categories: [],
	products: [],
	suppliers: [],
	status: 'INIT'
};

export default (state = initialState, action = {}) => {
	switch (action.type) {
		case 'FETCHING_USERS':
			return {
				...state,
				status: 'FETCHING'
			};

		case 'SET_USERS':
			return {
				...state,
				users: action.payload,
				status: 'FETCHED'
			};

		case 'FETCHED_CATEGORIES':
			return {
				...state,
				categories: action.payload,
				status: 'FETCHED'
			};

		case 'FETCHED_PRODUCTS':
			return {
				...state,
				products: action.payload,
				status: 'FETCHED'
			};
		case 'FETCHING_SUPPLIERS':
			return {
				...state,
				status: 'FETCHING'
			};

		case 'FETCHED_SUPPLIERS':
			return {
				...state,
				suppliers: action.payload,
				status: 'FETCHED'
			};

		case 'ADD_USER':
			return {
				...state,
				users: [...state.users, ...[action.payload]]
			};

		case 'SET_FILTER':
			return {
				...state,
				users: [...state.users, ...[action.payload]]
			};

		default:
			return state;
	}
};
