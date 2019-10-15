import React from 'react';
import {
	Create,
	Edit,
	List,
	SimpleForm,
	TextInput,
	LongTextInput,
	required,
	SelectInput,
	ReferenceInput,
	Datagrid,
	TextField,
	ReferenceField,
	EditButton,
	ShowButton,
	BooleanField,
	BooleanInput,
	Filter,
	NumberInput,
	DateField,
	ArrayInput,
	SimpleFormIterator,
	ArrayField,
	NumberField
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
			<ReferenceField label='category' source='category_id' reference='categories'>
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
			<ReferenceInput label='category' source='category_id' reference='categories'>
				<SelectInput />
			</ReferenceInput>
			<TextInput fullWidth source='description' />
			<NumberInput source='price' />
			<NumberInput source='stock' />
		</SimpleForm>
	</Edit>
);

export const ProductCreate = (props: any) => (
	<Create {...props} title={'Nuevo Producto'}>
		<SimpleForm>
			<TextInput fullWidth source='name' />
			<TextInput fullWidth source='code' />
			<NumberInput fullWidth source='price' />
			<NumberInput fullWidth source='stock' />
			<ReferenceInput label='category' source='category_id' reference='categories'>
				<SelectInput optionText='name' />
			</ReferenceInput>
			<TextInput fullWidth source='description' />
		</SimpleForm>
	</Create>
);
