import React from 'react';
import {
	Create,
	Edit,
	List,
	SimpleForm,
	TextInput,
	SelectInput,
	ReferenceInput,
	Datagrid,
	TextField,
	ReferenceField,
	EditButton,
	NumberInput,
} from 'react-admin';

export const SuppliersList = (props: any) => (
	<List
		{...props}
		title={'Proveedores'}
		style={{ alignItems: 'center', jusifyContent: 'center' }}
	>
		<Datagrid>
			<TextField source='name' />
			<ReferenceField
				label='category'
				source='category_id'
				reference='categories'
			>
				<TextField source='name' />
			</ReferenceField>
			<EditButton />
		</Datagrid>
	</List>
);

export const SuppliersEdit = (props: any) => (
	<Edit {...props} title={'Editando Proveedor'}>
		<SimpleForm>
			<TextInput fullWidth source='name' />
			<ReferenceInput
				label='category'
				source='category_id'
				reference='categories'
			>
				<SelectInput optionText='name' />
			</ReferenceInput>
			<NumberInput fullWidth step={10} max={100} source='discount' />
		</SimpleForm>
	</Edit>
);

export const SuppliersCreate = (props: any) => (
	<Create {...props} title={'Nuevp Proveedor'}>
		<SimpleForm>
			<TextInput fullWidth source='name' />
			<ReferenceInput
				label='category'
				source='category_id'
				reference='categories'
			>
				<SelectInput optionText='name' />
			</ReferenceInput>
			<NumberInput fullWidth step={10} max={100} source='discount' />
		</SimpleForm>
	</Create>
);
