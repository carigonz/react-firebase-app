import firebase from 'firebase/app'
import 'firebase/storage'

const convertFileToBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const uploadFiles = (name, file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);
    let url = `https://firebasestorage.googleapis.com/v0/b/puroescabiobar.appspot.com/o/images%2F${name}?alt=media`
    firebase.storage().ref().child(`images/${name}`).putString(reader.result)
    .then(r => {
      console.log(r)
      resolve(`https://storage.googleapis.com/${r.ref.bucket}/${r.ref.name}`)
    })
  });
  
  const addUploadFeature = requestHandler => (type, resource, params) => {
    if (type === 'UPDATE' || type === 'CREATE') {
        // notice that following condition can be true only when `<ImageInput source="pictures" />` component has parameter `multiple={true}`
        // if parameter `multiple` is false, then data.pictures is not an array, but single object
        if (params.data.pictures && params.data.pictures.length) {
            // only freshly dropped pictures are instance of File
            const formerPictures = params.data.pictures.filter(p => !(p.rawFile instanceof File));
            const newPictures = params.data.pictures.filter(p => p.rawFile instanceof File);

            return Promise.all(newPictures.map(convertFileToBase64))
                .then(base64Pictures => base64Pictures.map((picture64, index) => ({
                    src: picture64,
                    title: `${newPictures[index].title}`,
                })))
                .then(transformedNewPictures => requestHandler(type, resource, {
                    ...params,
                    data: {
                        ...params.data,
                        pictures: [...transformedNewPictures, ...formerPictures],
                    },
                }));
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
