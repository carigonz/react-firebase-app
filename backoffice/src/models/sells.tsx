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
	DateField
} from 'react-admin';

export const SellsList = (props: any) => (
	<List
		{...props}
		title={'Invitados'}
		style={{ alignItems: 'center', jusifyContent: 'center' }}
	>
		<Datagrid>
			<DateField source='date' />
			<ReferenceField label='Producto' source='product.id' reference='products'>
				<TextField source='name' />
			</ReferenceField>
			<EditButton />
		</Datagrid>
	</List>
);

export const SellsEdit = (props: any) => (
	<Edit {...props} title={'Editando Invitado'}>
		<SimpleForm>
			<TextInput fullWidth source='name' />
			<ReferenceInput label='category' source='category_id' reference='Sells-type'>
				<SelectInput optionText='name' />
			</ReferenceInput>
		</SimpleForm>
	</Edit>
);

export const SellsCreate = (props: any) => (
	<Create {...props} title={'Nueva Usuario'}>
		<SimpleForm>
			<TextInput fullWidth source='name' />
			<NumberInput fullWidth source='price' />
			<ReferenceField label='category' source='category_id' reference='categories'>
				<TextField source='name' />
			</ReferenceField>
		</SimpleForm>
	</Create>
);
