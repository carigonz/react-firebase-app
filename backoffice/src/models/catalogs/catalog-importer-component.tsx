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
	LinearProgress,
} from 'react-admin';
import firebase from 'firebase/app';
import readXlsxFile from 'read-excel-file';

export default class CatalogImporter extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			file: null,
			supplier: {
				id: '',
				name: '',
			},
			products: {},
			loading: false,
		};
	}

	handleChange = (event: any) => {
		const { value } = event.target;
		if (!this.state.file) {
			this.setState(
				{ file: null, supplier: { id: value, name: '' } }
				//() => console.log('state: ', this.state)
			);
		} else if (this.state.file) {
			const ref = firebase
				.storage()
				.ref(
					'catalogs/' + this.state.supplier.name + '/' + this.state.file.name
				);
			if (ref) {
				// console.log(ref);
				try {
					ref.delete();
					// console.log('borrado');
				} catch (error) {
					console.error(error);
				}
			}
			this.setState({ file: null, supplier: { id: value, name: '' } });
		}
	};

	readFile = (file: File) => {
		return new Promise((resolve) => {
			resolve(readXlsxFile(file, 'utf8'));
		});
	};

	async resolveFileReading(file: File) {
		console.log('calling');
		const result = await this.readFile(file);
		console.log(result);
		if (result instanceof Object) {
			this.setState({ products: result, loading: false });
		} else {
			console.error('pasaron cosas');
		}
	}

	handleUploadFile = (event: File | null) => {
		this.setState({ loading: true });

		if (event && !this.state.file) {
			this.setState({ file: event });
			firebase
				.firestore()
				.collection('suppliers')
				.doc(this.state.supplier.id)
				.get()
				.then((supplier) => {
					this.setState({
						supplier: {
							id: this.state.supplier.id,
							name: supplier.get('name'),
						},
					});
					const newRef = firebase
						.storage()
						.ref('catalogs/' + this.state.supplier.name + '/' + event.name);
					try {
						newRef.put(event);
						this.resolveFileReading(event);
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
					// console.log('borrado');
				} catch (error) {
					console.error(error);
				}
			}
			const newRef = firebase
				.storage()
				.ref('catalogs/' + this.state.supplier.name + '/' + event.name);
			this.setState({ file: event });
			try {
				newRef.put(event);
				this.resolveFileReading(event);
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
				//console.log(ref);
				try {
					ref.delete();
					// console.log('borrado');
				} catch (error) {
					console.error(error);
				}
			}
			this.setState({ file: null, loading: false, products: {} });
		}
	};

	render() {
		return (
			<div>
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
										//accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet | vnd.sealed.xls'
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
				{this.state.loading ? <LinearProgress /> : null}
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
	};
	products: {};
	loading: boolean;
}
