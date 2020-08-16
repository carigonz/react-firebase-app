import React, { Component } from 'react';
import {
	Create,
	SimpleForm,
	FileField,
	FileInput,
	ReferenceInput,
	SelectInput,
	required,
	FormDataConsumer,
	BooleanInput,
} from 'react-admin';
import firebase from 'firebase/app';

export default class CatalogImporter extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			file: null,
			supplier: {
				id: '',
				name: '',
				discount: 0,
				category_id: '',
				updatedAt: '',
			},
		};
	}

	handleChange = (event: any) => {
		const { value } = event.target;
		if (!this.state.file) {
			firebase
				.firestore()
				.collection('suppliers')
				.doc(value)
				.get()
				.then((supplier) => {
					if (supplier) {
						this.setState(
							{
								supplier: {
									id: value,
									name: supplier.get('name'),
									discount: supplier.get('discount'),
									category_id: supplier.get('category_id'),
									updatedAt: supplier.get('updatedAt'),
								},
							},
							() => console.log(this.state)
						);
					}
				});
		}
	};

	render() {
		return (
			<div>
				<Create
					{...this.props}
					title={'Cargar nueva Lista'}
					transform={(data: any) => ({
						...data,
						supplier: this.state.supplier,
					})}
				>
					<SimpleForm>
						<ReferenceInput
							label='Proveedor'
							source='supplier_id'
							reference='suppliers'
							validate={[required()]}
							onChange={this.handleChange}
						>
							<SelectInput
								source='name'
								disabled={this.state.file ? true : null}
							/>
						</ReferenceInput>
						<BooleanInput label='Lista con iva incluido?' source='iva' />
						<FormDataConsumer>
							{({ formData, ...rest }: any) => {
								if (!formData.supplier_id) return null;
								return (
									<FileInput
										source='file'
										label='Importar archivo Excel'
										//accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet | vnd.sealed.xls'
										placeholder={
											<p>
												Arrastra un archivo aquí o haga click para seleccionar
												uno.
											</p>
										}
										validate={[required()]}
									>
										<FileField source='src' title='title' />
									</FileInput>
								);
							}}
						</FormDataConsumer>
					</SimpleForm>
				</Create>
			</div>
		);
	}
}

interface IProps {
	data: boolean;
}

interface IState {
	file: File | null;
	supplier: {
		id: string;
		name: string;
		discount: number;
		category_id: string;
		updatedAt: string;
	};
}
