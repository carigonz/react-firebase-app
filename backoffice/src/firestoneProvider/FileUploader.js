import firebase from 'firebase/app';
import 'firebase/storage';
import * as XLSX from 'xlsx';

const getSupplier = (supplier) => {
	return new Promise((resolve, reject) => {
		resolve(
			firebase
				.firestore()
				.collection('suppliers')
				.doc(supplier.id)
				.get()
				.then((supp) => supp.data())
		);
		reject('El proveedor no existe. Contacte administracion');
	});
};

const convertFileToBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file.rawFile);
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;
	});

const processPublicPrice = (products, supplier, hasIva) => {
	const addIva = 1.6;
	const withoutIva = 1.4;
	return products.map((product) => {
		product.costo = parseFloat(product.costo.replace(',', '.'));
		if (supplier.discount) {
			product.precio_publico =
				product.costo - product.costo * (supplier.discount / 100);
		}

		if (hasIva) {
			product.precio_publico = product.cost * withoutIva;
		} else {
			product.precio_publico = product.precio_publico * addIva;
		}
		return product;
	});
};

const addUploadFeature = (requestHandler) => (type, resource, params) => {
	if (type === 'UPDATE' || type === 'CREATE') {
		console.log('Im on add upload feature');
		if (
			type === 'CREATE' &&
			resource === 'catalogs' &&
			params.data.file.rawFile instanceof File
		) {
			console.log('all data: ', params.data);
			let { supplier, file, iva } = params.data;
			let rowObject = null;
			let fileName = file.title.replace(' ', '-');
			fileName = fileName.substring(0, fileName.indexOf('.'));
			const title = file.title;

			// read file
			let fileReader = new FileReader();
			fileReader.readAsBinaryString(file.rawFile);
			fileReader.onload = (event) => {
				let data = event.target.result;
				let workbook = XLSX.read(data, { type: 'binary' });

				let firstSheet = workbook.SheetNames[0];
				rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], {
					raw: true,
					blankrows: false,
					defval: null,
				});
				console.log(rowObject);
				rowObject = processPublicPrice(rowObject, supplier, iva);
			};
			delete params.data.supplier_id;

			return getSupplier(supplier)
				.then((supplier) =>
					firebase
						.storage()
						.ref('catalogs/' + supplier.name + '/' + fileName)
						.put(file.rawFile)
				)
				.then((snapshot) => snapshot.ref.getDownloadURL())
				.then((downloadURL) => {
					return requestHandler(type, resource, {
						...params,
						data: {
							...params.data,
							name: fileName,
							products: rowObject,
							file: {
								title,
								url: downloadURL,
								createdAt: new Date(),
							},
						},
					});
				});
		}

		// notice that following condition can be true only when `<ImageInput source="pictures" />` component has parameter `multiple={true}`
		// if parameter `multiple` is false, then data.pictures is not an array, but single object
		if (params.data.pictures && params.data.pictures.length) {
			// only freshly dropped pictures are instance of File
			const formerPictures = params.data.pictures.filter(
				(p) => !(p.rawFile instanceof File)
			);
			const newPictures = params.data.pictures.filter(
				(p) => p.rawFile instanceof File
			);

			return Promise.all(newPictures.map(convertFileToBase64))
				.then((base64Pictures) =>
					base64Pictures.map((picture64, index) => ({
						src: picture64,
						title: `${newPictures[index].title}`,
					}))
				)
				.then((transformedNewPictures) =>
					requestHandler(type, resource, {
						...params,
						data: {
							...params.data,
							pictures: [...transformedNewPictures, ...formerPictures],
						},
					})
				);
		}
	}
	// for other request types and resources, fall back to the default request handler
	return requestHandler(type, resource, params);
};

export default addUploadFeature;
