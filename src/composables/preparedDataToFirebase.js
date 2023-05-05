import {fileExist, uploadFile} from "../firebase";

async function prepareImageToFirebase(image, url) {
  if (Object.keys(image).length) {
    return {
      fileId: image.fileId,
      file: await fileExist(image.fileId, url) ? image.file : await uploadFile(`${url}/${image.fileId}`, image.file),
    }
  } else {
    return {}
  }
}

async function prepareImagesArrToFirebase(imagesArr, url) {
  let items = []

  for (let i = 0; i < imagesArr.length; i++) {
    let item = imagesArr[i]

    items.push({
      fileId: item.fileId,
      file: await fileExist(item.fileId, url) ? item.file : await uploadFile(`${url}/${item.fileId}`, item.file),
    })
  }

  return items
}

export {prepareImageToFirebase, prepareImagesArrToFirebase}