import React from 'react';
import ImageSelect from './imageSelect';
import EventDescription from './eventDescription';
import { ActivityIndicator } from 'react-native';

export default class Main extends React.Component {
  state = {
    imageUri: null,
    uploading: false,
    uploaded: false
  }
  render() {
    let renderResult = null;

    if (this.state.uploaded) {
      renderResult = <EventDescription imageUri={this.state.imageUri} />
    } else {
      renderResult = <ImageSelect imageHandler={this._handleImagePicked}/>;
    }
    return (<ActivityIndicator
        animating={true}
        style={{height: 80}}
        size="large"
      />);
  }

  _handleImagePicked = async (pickerResult) => {
    this.setState({imageUri: pickerResult.uri});

    let uploadResponse, uploadResult;

    try {
      this.setState({uploading: true});

      /**if(!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
        this.setState({image: uploadResult.location});
      }
      **/
    } catch(e) {
      /**console.log({uploadResponse});
      console.log({uploadResult});
      console.log({e});
      alert('Upload failed');**/
    } finally {
      this.setState({uploading: false, uploaded: true});
    }
  }
}
async function uploadImageAsync(uri) {
  return true;
}

