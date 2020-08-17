import React from 'react';
import {
	Edit,
	List,
	Datagrid,
	TextField,
	EditButton,
	SimpleForm,
	FileInput,
	ReferenceField,
	UrlField,
	BooleanField,
	FileField,
	required,
} from 'react-admin';

export const CatalogsList = (props: any) => (
	<List
		{...props}
		title={'Listas de Precio'}
		style={{ alignItems: 'center', jusifyContent: 'center' }}
	>
		<Datagrid>
			<TextField label='Nombre' source='name' />
			<ReferenceField
				label='Proveedor'
				source='supplier.id'
				reference='suppliers'
			>
				<TextField source='name' />
			</ReferenceField>
			<BooleanField label='Iva Incluido' source='iva' />
			<UrlField label='Descargar' source='file.url' />
			<EditButton />
		</Datagrid>
	</List>
);

export const CatalogsEdit = (props: any) => (
	<Edit {...props} title={'Actualizar lista'}>
		<SimpleForm>
			<TextField source='file.title' disabled label='Lista anterior' />
			<FileInput
				source='file'
				label='Importar archivo Excel'
				//accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet | vnd.sealed.xls'
				placeholder={
					<p>Arrastra un archivo aquí o haga click para seleccionar uno.</p>
				}
				validate={[required()]}
			>
				<FileField source='src' title='title' />
			</FileInput>
		</SimpleForm>
	</Edit>
);
