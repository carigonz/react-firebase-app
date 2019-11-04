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
	NumberField,
	Filter,
	NumberInput
} from 'react-admin';
export const UpdateList = (props: any) => (
	<List
		{...props}
		title={'Productos'}
		style={{ alignItems: 'center', jusifyContent: 'center' }}
	>
		<Datagrid>
			<TextField source='name' />
			<TextField source='code' />
			<TextField source='description' />
			<ReferenceField label='proveedor' source='supplier_id' reference='suppliers'>
				<TextField source='name' />
			</ReferenceField>
			<ReferenceField label='category' source='category_id' reference='categories'>
				<TextField source='name' />
			</ReferenceField>
			<NumberField source='price' />
			<EditButton />
		</Datagrid>
	</List>
);

/* export const SuppliersEdit = (props: any) => (
	<Edit {...props} title={'Editando Proveedor'}>
		<SimpleForm>
			<TextInput fullWidth source='name' />
			<ReferenceInput label='category' source='category_id' reference='categories'>
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
			<ReferenceInput label='category' source='category_id' reference='categories'>
				<SelectInput optionText='name' />
			</ReferenceInput>
			<NumberInput fullWidth step={10} max={100} source='discount' />
		</SimpleForm>
	</Create>
);
 */
