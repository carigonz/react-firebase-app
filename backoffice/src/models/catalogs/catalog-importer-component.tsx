import React, { Component } from 'react';
import { Create, SimpleForm, FileField, FileInput } from 'react-admin';

export default class CatalogImporter extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			file: null,
		};
	}

	render() {
		return (
			<Create
				{...this.props}
				title={'Cargar nueva Lista'}
				//actions={<PostEditActions />}
			>
				<SimpleForm>
					<FileInput
						source='file'
						label='Importar archivo Excel'
						accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
						placeholder={
							<p>Arrastra un archivo aquí o haga click para seleccionar uno.</p>
						}
					>
						<FileField source='src' title='title' />
					</FileInput>
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
}

// export default class FileImporter extends React.Component<IProps, IState> {
// 	constructor(props: IProps) {
// 		super(props);
// 		this.state = {
// 			file: null,
// 		};
// 	}
// 	// let fileName = "newData.xlsx";
// 	// let workbook = excel.readFile(fileName);
// 	// console.log(workbook) //should print an array with the excel file data
// 	render() {
// 		return (
// 			<div>
// 				<FileInput
// 					source='file'
// 					label='Importar archivo Excel'
// 					accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
// 					placeholder={
// 						<p>Arrastra un archivo aquí o haga click para seleccionar uno.</p>
// 					}
// 					//placeholder='Arrastra un archivo aquí o haga click para seleccionar uno.'
// 				>
// 					<FileField source='src' title='title' />
// 				</FileInput>
// 				<FormDataConsumer>
// 					{({ formData, ...rest }: any) => {
// 						if (!formData.file) return null;
// 						// console.log(formData);

// 						// formData.file ? console.log(formData) : console.log('not input');
// 					}}
// 				</FormDataConsumer>
// 			</div>
// 		);
// 	}
// }

// function test(file: File) {
// 	console.log(file);
// 	//f = file
// 	var name = file.name;
// 	const reader = new FileReader();
// 	reader.onload = (file) => {
// 		// evt = on_file_select event
// 		/* Parse data */
// 		const bstr = file.target.result;
// 		const wb = XLSX.read(bstr, { type: 'binary' });
// 		/* Get first worksheet */
// 		const wsname = wb.SheetNames[0];
// 		const ws = wb.Sheets[wsname];
// 		/* Convert array of arrays */
// 		const data = XLSX.utils.sheet_to_csv(ws);
// 		/* Update state */
// 		console.log('Data>>>' + data);
// 	};
// 	reader.readAsBinaryString(file.src);
// }
