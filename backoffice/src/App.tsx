import React from 'react';
import { Admin, Resource } from 'react-admin';
import { createMuiTheme } from '@material-ui/core/styles';

import {
	RestProvider,
	AuthProvider,
	base64Uploader
} from './firestoneProvider';

import { UsersList, UsersCreate, UsersEdit } from './models/users';
import {
	SuppliersList,
	SuppliersCreate,
	SuppliersEdit
} from './models/suppliers';
import {
	CategoriesCreate,
	CategoriesEdit,
	CategoriesList
} from './models/categories';
import { ProductCreate, ProductEdit, ProductList } from './models/product';
import { SellsList } from './models/sells';
import { UpdateList } from './models/updates';

const firebaseConfig = require('./credencials.json');

const trackedResources = [
	{
		name: 'users',
		isPublic: false
	},
	{
		name: 'suppliers',
		isPublic: false
	},
	{
		name: 'categories',
		isPublic: false
	},
	{
		name: 'products',
		isPublic: false
	},
	{
		name: 'sells',
		isPublic: false
	},
	{
		name: 'updates',
		isPublic: false
	}
];

const authConfig = {
	userProfilePath: '/users/',
	userAdminProp: 'isAdmin'
};

const dataProvider = base64Uploader(
	RestProvider(firebaseConfig, { trackedResources })
);

const theme = createMuiTheme({
	palette: {
		type: 'light',
		primary: {
			light: '#b0bec5',
			main: '#607d8b',
			dark: '#263238',
			contrastText: '#FFF'
		},
		secondary: {
			light: '#03a9f4',
			main: '#0288d1',
			dark: '#333',
			contrastText: '#fff'
		}
	}
});

const App: React.FC = () => {
	return (
		<Admin
			theme={theme}
			title='Backoffice'
			dataProvider={dataProvider}
			authProvider={AuthProvider(authConfig)}
		>
			<Resource
				name='users'
				list={UsersList}
				edit={UsersEdit}
				create={UsersCreate}
			/>

			<Resource
				name='suppliers'
				list={SuppliersList}
				edit={SuppliersEdit}
				create={SuppliersCreate}
			/>

			<Resource
				name='products'
				list={ProductList}
				edit={ProductEdit}
				create={ProductCreate}
			/>
			<Resource
				name='categories'
				list={CategoriesList}
				edit={CategoriesEdit}
				create={CategoriesCreate}
			/>
			<Resource name='updates' list={ProductList} />
			{/* <Resource name='sells' list={SellsList} /> */}
		</Admin>
	);
};

export default App;
