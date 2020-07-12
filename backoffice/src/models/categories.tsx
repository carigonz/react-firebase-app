import React from 'react';
import {
	Create,
	Edit,
	List,
	SimpleForm,
	TextInput,
	Datagrid,
	TextField,
	EditButton,
} from 'react-admin';

export const CategoriesList = (props: any) => (
	<List
		{...props}
		title={'Categorias'}
		style={{ alignItems: 'center', jusifyContent: 'center' }}
	>
		<Datagrid>
			<TextField source='name' />
			<EditButton />
		</Datagrid>
	</List>
);

export const CategoriesEdit = (props: any) => (
	<Edit {...props} title={'Editando Categoria'}>
		<SimpleForm>
			<TextInput fullWidth source='name' />
		</SimpleForm>
	</Edit>
);

export const CategoriesCreate = (props: any) => (
	<Create {...props} title={'Nueva Categoria'}>
		<SimpleForm>
			<TextInput fullWidth source='name' />
		</SimpleForm>
	</Create>
);
