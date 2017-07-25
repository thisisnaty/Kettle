import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ImagePicker } from 'expo';

export default class App extends React.Component {
  state = {
    image: null,
    uploading: false,
  }
  _handlePress() {
    console.log('Button pressed');
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button 
          onPress={this._takePhoto}
          title="Take Photo"/>
      </View>
    );
  }

  _takePhoto = async () => {
  let pickerResult = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4,3]
  });

  this._handleImagePicked(pickerResult);
}


_handleImagePicked = async (pickerResult) => {
  let uploadResponse, uploadResult;

  try {
    this.setState({uploading: true});

    if(!pickerResult.cancelled) {
      uploadResponse = await uploadImageAsync(pickerResult.uri);
      uploadResult = await uploadResponse.json();
      this.setState({image: uploadResult.location});
    }
  } catch(e) {
    console.log({uploadResponse});
    console.log({uploadResult});
    console.log({e});
    alert('Upload failed');
  } finally {
    this.setState({uploading: false});
  }
}
}
async function uploadImageAsync(uri) {
  return true;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
