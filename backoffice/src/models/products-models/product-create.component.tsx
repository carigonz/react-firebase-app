import React from 'react';
import {
	Create,
	SimpleForm,
	TextInput,
	SelectInput,
	ReferenceInput,
	NumberInput,
	FileField,
	FileInput,
} from 'react-admin';

const displayCreateProduct = () => (
	<div>
		<TextInput fullWidth source='name' />
		<TextInput fullWidth source='code' />
		<NumberInput fullWidth source='price' />
		{/* <NumberInput fullWidth source='stock' /> */}
		<ReferenceInput
			label='category'
			source='category_id'
			reference='categories'
		>
			<SelectInput optionText='name' />
		</ReferenceInput>
		<ReferenceInput label='supplier' source='supplier_id' reference='suppliers'>
			<SelectInput source='name' />
		</ReferenceInput>
		<TextInput fullWidth source='description' />
	</div>
);

const displayImportByFile = () => (
	<div>
		<FileInput
			source='files'
			label='Related files'
			accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		>
			<FileField source='src' title='title' />
		</FileInput>
	</div>
);

export default class ProductCreate extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			currentUpdateBy: '',
		};
	}
	render() {
		return (
			<Create {...this.props} title={'Nuevo Producto'}>
				{/* need to refactor for create by input or create by element */}
				<SimpleForm>
					<h4>Quiere crear un producto o importar una lista ?</h4>
					<div>
						<label
							htmlFor='inputType'
							onClick={() => this.setState({ currentUpdateBy: 'product' })}
						>
							<input type='radio' name='inputType' value='product' /> Producto
						</label>
					</div>
					<div>
						<label
							htmlFor='inputType'
							onClick={() => this.setState({ currentUpdateBy: 'file' })}
						>
							<input type='radio' name='inputType' /> Archivo xlsx
						</label>
					</div>

					{this.state.currentUpdateBy === 'file'
						? displayImportByFile()
						: this.state.currentUpdateBy === 'product'
						? displayCreateProduct()
						: ''}
				</SimpleForm>
			</Create>
		);
	}
}

interface IProps {
	inputType: string;
	name: string;
	code: string;
	price: number;
	category_id: BigInt;
	supplier_id: BigInt;
}

interface IState {
	currentUpdateBy: string;
}
