import React from 'react';
import {
	RestProvider,
	AuthProvider,
	base64Uploader,
	fileUploader,
} from './firestoneProvider';

import { Admin, Resource } from 'react-admin';
import { createMuiTheme } from '@material-ui/core/styles';
import UserIcon from '@material-ui/icons/People';
import BusinessIcon from '@material-ui/icons/BusinessCenter';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import CategoryIcon from '@material-ui/icons/Category';
import CatalogImporter from './models/catalogs/catalog-importer-component';
import BackupIcon from '@material-ui/icons/Backup';

import { UsersList, UsersCreate, UsersEdit } from './models/users';
import {
	SuppliersList,
	SuppliersCreate,
	SuppliersEdit,
} from './models/suppliers';
import {
	CategoriesCreate,
	CategoriesEdit,
	CategoriesList,
} from './models/categories';
import { CatalogsList, CatalogsEdit } from './models/catalogs/catalogs';
import { ProductEdit, ProductList, ProductCreate } from './models/product';

const firebaseConfig = require('./credencials.json');

const trackedResources = [
	{
		name: 'users',
		isPublic: false,
	},
	{
		name: 'suppliers',
		isPublic: false,
	},
	{
		name: 'categories',
		isPublic: false,
	},
	{
		name: 'products',
		isPublic: false,
	},
	{
		name: 'catalogs',
		isPublic: false,
	},
	{
		name: 'updates',
		isPublic: false,
	},
];

const authConfig = {
	userProfilePath: '/users/',
	userAdminProp: 'isAdmin',
};

// es necesario declarar el data provider desde aca  PORRRRKE ?
const dataProvider = fileUploader(
	RestProvider(firebaseConfig, { trackedResources })
);
// console.log(firebaseConfig);
// console.log(trackedResources);

const theme = createMuiTheme({
	palette: {
		type: 'light',
		primary: {
			light: '#b0bec5',
			main: '#607d8b',
			dark: '#263238',
			contrastText: '#FFF',
		},
		secondary: {
			light: '#03a9f4',
			main: '#0288d1',
			dark: '#333',
			contrastText: '#fff',
		},
	},
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
				icon={UserIcon}
				options={{ label: 'Usuarios' }}
			/>

			<Resource
				name='suppliers'
				list={SuppliersList}
				edit={SuppliersEdit}
				create={SuppliersCreate}
				icon={BusinessIcon}
				options={{ label: 'Proveedores' }}
			/>

			<Resource
				name='products'
				list={ProductList}
				edit={ProductEdit}
				create={ProductCreate}
				icon={ImportExportIcon}
				options={{ label: 'Productos' }}
			/>
			<Resource
				name='categories'
				list={CategoriesList}
				edit={CategoriesEdit}
				create={CategoriesCreate}
				icon={CategoryIcon}
				options={{ label: 'Categorías' }}
			/>
			<Resource
				name='catalogs'
				list={CatalogsList}
				create={CatalogImporter}
				edit={CatalogsEdit}
				icon={BackupIcon}
				options={{ label: 'Listas de Precio' }}
			/>
			{/* <Resource name='updates' list={ProductList} /> */}
			{/* <Resource name='sells' list={SellsList} /> */}
		</Admin>
	);
};

export default App;
