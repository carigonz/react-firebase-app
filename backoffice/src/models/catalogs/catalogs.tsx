import React from 'react';
import {
	Edit,
	List,
	Datagrid,
	TextField,
	EditButton,
	SimpleForm,
	TextInput,
} from 'react-admin';

export const CatalogsList = (props: any) => (
	<List
		{...props}
		title={'Listas de Precio'}
		style={{ alignItems: 'center', jusifyContent: 'center' }}
	>
		<Datagrid>
			<TextField source='name' />
			<EditButton />
		</Datagrid>
	</List>
);

export const CatalogsEdit = (props: any) => (
	<Edit {...props} title={'Actualizar lista'}>
		<SimpleForm>
			<TextInput fullWidth source='name' />
		</SimpleForm>
	</Edit>
);
