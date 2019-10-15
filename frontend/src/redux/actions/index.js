import firebase from '../../firebase';

const usersCollection = firebase.firestore().collection('users');
const categoriesCollection = firebase.firestore().collection('categories');
const productsCollection = firebase.firestore().collection('products');
const sellsCollection = firebase.firestore().collection('sells');
const suppliersCollection = firebase.firestore().collection('suppliers');

export const getUsers = () => {
	return (dispatch, getState) => {
		dispatch({ type: 'FETCHING_USERS' });
		usersCollection
			.get()
			.then(response => {
				let payload = [];
				response.forEach(e => {
					payload.push({ ...e.data(), id: e.id });
				});
				setTimeout(() => {
					dispatch({ type: 'SET_USERS', payload: payload });
				}, 3000);
			})
			.catch(err => {
				dispatch({ type: 'SET_STATUS', payload: 'NOT_FORM' });
			});
	};
};

export const getCategories = () => {
	return async (dispatch, getState) => {
		dispatch({ type: 'FETCHING_CATEGORIES' });
		try {
			let response = await categoriesCollection.get();
			let payload = [];
			response.forEach(e => {
				payload.push({ ...e.data(), id: e.id });
			});
			dispatch({ type: 'FETCHED_CATEGORIES', payload });
		} catch (error) {
			dispatch({ type: 'SET_STATUS', payload: 'NOT_FORM' });
		}
	};
};

export const getProducts = () => {
	return async (dispatch, getState) => {
		dispatch({ type: 'FETCHING_PRODUCTS' });
		productsCollection.onSnapshot(response => {
			let payload = [];
			response.forEach(e => {
				payload.push({ ...e.data(), id: e.id });
			});
			console.log('====================================');
			console.log('SNAPSHOT');
			console.log('====================================');
			dispatch({ type: 'FETCHED_PRODUCTS', payload });
		});
	};
};

export const buyProduct = (product, key) => {
	return async (dispatch, getState) => {
		sellsCollection
			.add({
				product,
				key,
				date: new Date().getTime()
			})
			.then(() => {
				alert('Ha comprado el producto');
			});
	};
};

export const getSuppliers = () => {
	return async (dispatch, getState) => {
		dispatch({ type: 'FETCHING_SUPPLIERS' });
		try {
			let response = await suppliersCollection.get();
			let payload = [];
			response.forEach(e => {
				payload.push({ ...e.data(), id: e.id });
			});
			dispatch({ type: 'FETCHED_SUPPLIERS', payload });
		} catch (error) {
			dispatch({ type: 'SET_STATUS', payload: 'NOT_FORM' });
		}
	};
};
