import { RNS3 } from 'react-native-aws3';
import { Config } from '../../env' 

export async function uploadImageAsync(imageUri) {
  let uriParts = imageUri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  const file = {
    uri: imageUri,
    name: `image-${Math.random().toString(36).substr(2, 18)}.${fileType}`,
    type: `image/${fileType}`
  }

  const options = {
    bucket: Config.AWS_BUCKET,
    region: Config.AWS_BUCKET_LOCATION,
    accessKey: Config.AWS_ACCESS_KEY,
    secretKey: Config.AWS_SECRET,
    successActionStatus: 201
  }

  return RNS3.put(file, options).then(response => {
    if (response.status !== 201)
      throw new Error("Failed to upload image to S3");

    let formData = new FormData();
    formData.append('url', response.body.postResponse.location);
    let options = {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    return fetch(Config.API_ENDPOINT, options);
  });
}
