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
	EditButton,
	BooleanField,
	BooleanInput,
	Filter,
} from 'react-admin';

const PostFilter = (props: any) => (
	<Filter {...props}>
		<TextInput label='Search' source='q' alwaysOn />
		<ReferenceInput label='User' source='userId' reference='users' allowEmpty>
			<SelectInput optionText='name' />
		</ReferenceInput>
	</Filter>
);

export const UsersList = (props: any) => (
	<List
		{...props}
		title={'Invitados'}
		style={{ alignItems: 'center', jusifyContent: 'center' }}
		filters={<PostFilter />}
	>
		<Datagrid>
			<TextField source='name' />
			<BooleanField source='isAdmin' />
			<EditButton />
		</Datagrid>
	</List>
);

export const UsersEdit = (props: any) => (
	<Edit {...props} title={'Editando Invitado'}>
		<SimpleForm>
			<TextInput fullWidth source='name' />
			<BooleanInput source='isAdmin' />
		</SimpleForm>
	</Edit>
);

export const UsersCreate = (props: any) => (
	<Create {...props} title={'Nueva Usuario'}>
		<SimpleForm>
			<TextInput fullWidth source='name' />
			<BooleanInput source='isAdmin' />
		</SimpleForm>
	</Create>
);
