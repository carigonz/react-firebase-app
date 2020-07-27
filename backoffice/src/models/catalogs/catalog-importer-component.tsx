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
} from 'react-admin';
import firebase from 'firebase/app';

export default class CatalogImporter extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			file: null,
			supplier_id: '',
			supplier: {
				name: '',
			},
		};
	}

	handleChange = (event: any) => {
		const { value } = event.target;
		if (!this.state.file) {
			this.setState(
				{ supplier_id: value, file: null, supplier: { name: '' } },
				() => console.log('state: ', this.state)
			);
		} else if (this.state.file) {
			const ref = firebase
				.storage()
				.ref(
					'catalogs/' + this.state.supplier.name + '/' + this.state.file.name
				);
			if (ref) {
				console.log(ref);
				try {
					ref.delete();
					console.log('borrado');
				} catch (error) {
					console.error(error);
				}
			}
			this.setState(
				{ supplier_id: value, file: null, supplier: { name: '' } },
				() => console.log('state: ', this.state)
			);
		}
	};

	handleUploadFile = (event: File | null) => {
		console.log(event);
		if (event && !this.state.file) {
			this.setState({ file: event });
			firebase
				.firestore()
				.collection('suppliers')
				.doc(this.state.supplier_id)
				.get()
				.then((supplier) => {
					this.setState({
						supplier: { name: supplier.get('name') },
					});
					const newRef = firebase
						.storage()
						.ref('catalogs/' + this.state.supplier.name + '/' + event.name);
					try {
						const task = newRef.put(event);
						console.log('creado');
					} catch (error) {
						console.error(error);
					}
				});
		} else if (event && this.state.file) {
			const currentRef = firebase
				.storage()
				.ref(
					'catalogs/' + this.state.supplier.name + '/' + this.state.file.name
				);
			if (currentRef) {
				try {
					currentRef.delete();
					console.log('borrado');
				} catch (error) {
					console.error(error);
				}
			}
			const newRef = firebase
				.storage()
				.ref('catalogs/' + this.state.supplier.name + '/' + event.name);
			this.setState({ file: event });
			try {
				const task = newRef.put(event);
				console.log('creado');
			} catch (error) {
				console.error(error);
			}
		} else if (!event && this.state.file) {
			const ref = firebase
				.storage()
				.ref(
					'catalogs/' + this.state.supplier.name + '/' + this.state.file.name
				);
			if (ref) {
				console.log(ref);
				try {
					ref.delete();
					console.log('borrado');
				} catch (error) {
					console.error(error);
				}
			}
			this.setState({ file: null });
		}
	};

	render() {
		return (
			<Create {...this.props} title={'Cargar nueva Lista'}>
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
					<FormDataConsumer>
						{({ formData, ...rest }: any) => {
							if (!formData.supplier_id) return null;
							return (
								<FileInput
									source='file'
									label='Importar archivo Excel'
									accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
									placeholder={
										<p>
											Arrastra un archivo aquí o haga click para seleccionar
											uno.
										</p>
									}
									validate={[required()]}
									onChange={this.handleUploadFile}
									required
								>
									<FileField source='src' title='title' />
								</FileInput>
							);
						}}
					</FormDataConsumer>
				</SimpleForm>
			</Create>
		);
	}
}

interface IProps {
	data: boolean;
}

interface IState {
	file: File | null;
	supplier_id: string;
	supplier: {
		name: string;
	};
}
