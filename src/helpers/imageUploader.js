const uriEndpoint = 'http://post2cal.azurewebsites.net/api/photo';

export async function uploadImageAsync(imageUri) {
  let uriParts = imageUri.split('.');
  let fileType = imageUri[imageUri.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    imageUri,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(uriEndpoint, options);
}
