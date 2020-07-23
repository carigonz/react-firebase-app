import firebase from 'firebase/app';
import 'firebase/storage';
import * as XLSX from 'xlsx';

const convertFileToBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file.rawFile);
		reader.onload = (file) => processExcel(reader.result);
		reader.onerror = reject;
	});

function Upload() {
	const fileUpload = document.getElementById('fileUpload');
	const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
	if (regex.test(fileUpload.value.toLowerCase())) {
		let fileName = fileUpload.files[0].name;
		if (typeof FileReader !== 'undefined') {
			const reader = new FileReader();
			if (reader.readAsBinaryString) {
				reader.onload = (e) => {
					processExcel(reader.result);
				};
				reader.readAsBinaryString(fileUpload.files[0]);
			}
		} else {
			console.log('This browser does not support HTML5.');
		}
	} else {
		console.log('Please upload a valid Excel file.');
	}
}

function processExcel(data) {
	const workbook = XLSX.read(data, { type: 'binary' });
	const firstSheet = workbook.SheetNames[0];
	const excelRows = XLSX.utils.sheet_to_row_object_array(
		workbook.Sheets[firstSheet]
	);

	console.log(excelRows);
}
async function convertToFile(url, title) {
	let response = await fetch(url);
	let blob = await response.blob();

	return new File([blob], title, {
		type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	});
}
const uploadFiles = (name, file) =>
	new Promise((resolve, reject) => {
		console.log('entre en uploadFiles');
		console.log('name: ', name);
		console.log('file: ', file);
		console.log('typeof file: ', typeof file.src);
		const test = convertToFile(file.src, name);
		const reader = new FileReader();
		reader.readAsDataURL(test);
		let url = `https://firebasestorage.googleapis.com/v0/b/puroescabiobar.appspot.com/o/images%2F${name}?alt=media`;
		firebase
			.storage()
			.ref()
			.child(`catalogs/${name}`)
			.putString(reader.result)
			.then((r) => {
				console.log(r);
				resolve(`https://storage.googleapis.com/${r.ref.bucket}/${r.ref.name}`);
			});
	});

const addUploadFeature = (requestHandler) => (type, resource, params) => {
	if (type === 'UPDATE' || type === 'CREATE') {
		if (
			type === 'CREATE' &&
			resource === 'products' &&
			params.data.file.rawFile instanceof File
		) {
			// console.log('data: ', params);
			// console.log('resource: ', resource);
			// console.log('type: ', type);
			// here comes to uplead a file
			console.log(requestHandler);
			// let reader = new FileReader();
			// reader.onload = function(e) {
			//     this.setState({file: reader.result})
			// }
			// reader.readAsDataURL(e.target.files[0]);

			return new Promise((resolve, reject) => {
				resolve(uploadFiles(params.data.file.title, params.data.file));
			}).then((transformedNewPictures) =>
				requestHandler(type, resource, {
					...params,
					data: {
						...params.data,
						pictures: [...transformedNewPictures],
					},
				})
			);
			// return Promise.all(newPictures.map(convertFileToBase64))
			// 	.then((base64Pictures) =>
			// 		base64Pictures.map((picture64, index) => ({
			// 			src: picture64,
			// 			title: `${newPictures[index].title}`,
			// 		}))
			// 	)
			// 	.then((transformedNewPictures) =>
			// 		requestHandler(type, resource, {
			// 			...params,
			// 			data: {
			// 				...params.data,
			// 				pictures: [...transformedNewPictures, ...formerPictures],
			// 			},
			// 		})
			// 	);
			// let fileName = "newData.xlsx";
			// let workbook = XLSX.readFile(params.data.file.title);
			// console.log(workbook); //should print an array with the excel file data
			return uploadFiles(params.data.file.title, params.data.file.src);
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

// const addUploadFeature = requestHandler => async (type, resource, params) => {
//   if (type === 'UPDATE' || type === 'CREATE') {
//     if (params.data.images) {
//       console.log('====================================');
//       console.log(params);
//       console.log('====================================');
//       let url = await uploadFiles(params.data.image.title, params.data.image)
//       return requestHandler(type, resource, {
//           ...params,
//           data: {
//             ...params.data,
//             image: {
//               src: url,
//               title: params.data.title
//               }
//           }
//         })
//       // return Promise.all(newPictures.map(convertFileToBase64))
//       //   .then(base64Pictures =>
//       //     base64Pictures.map(image64 => ({
//       //       src: image64,
//       //       title: `${params.data.title}`
//       //     }))
//       //   )
//       //   .then(transformedNewPictures =>
//       //     requestHandler(type, resource, {
//       //       ...params,
//       //       data: {
//       //         ...params.data,
//       //         image: [...transformedNewPictures, ...formerPictures]
//       //       }
//       //     })
//       //   );
//     }
//   }
//   // for other request types and reources, fall back to the defautl request handler
//   return requestHandler(type, resource, params);
// };

export default addUploadFeature;
