import React from 'react';
import {
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
	NumberField,
} from 'react-admin';

export const ProductList = (props: any) => (
	<List
		{...props}
		title={'Productos'}
		style={{ alignItems: 'center', jusifyContent: 'center' }}
	>
		<Datagrid>
			<TextField source='name' />
			<TextField source='code' />
			<TextField source='description' />
			<ReferenceField
				label='proveedor'
				source='supplier_id'
				reference='suppliers'
			>
				<TextField source='name' />
			</ReferenceField>
			<ReferenceField
				label='category'
				source='category_id'
				reference='categories'
			>
				<TextField source='name' />
			</ReferenceField>
			<NumberField source='price' />
			<EditButton />
		</Datagrid>
	</List>
);

export const ProductEdit = (props: any) => (
	<Edit {...props} title={'Editando Producto'}>
		<SimpleForm>
			<TextInput fullWidth source='name' />
			<TextInput source='code' />
			<ReferenceInput
				label='categoria'
				source='category_id'
				reference='categories'
			>
				<SelectInput />
			</ReferenceInput>
			<TextInput fullWidth source='description' />
			<ReferenceInput
				label='proveedor'
				source='supplier_id'
				reference='suppliers'
			>
				<SelectInput />
			</ReferenceInput>
			<NumberInput source='price' />
			{/* <NumberInput source='stock' /> */}
		</SimpleForm>
	</Edit>
);
