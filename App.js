import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { ImagePicker } from 'expo';
import { EvilIcons } from '@expo/vector-icons';

export default class App extends React.Component {
  state = {
    image: null,
    uploading: false,
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this._takePhoto} style={styles.circle}>
          <EvilIcons name="camera" size={86} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this._selectPhoto} style={styles.circle}>
          <EvilIcons name="image" size={86} color="white"/>
        </TouchableOpacity>
      </View>
    );   
  }

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4,3]
    });

    this._handleImagePicked(pickerResult);
  }

  _selectPhoto = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4,3]
    })
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
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  circle: {
    width: 116,
    height: 116,
    borderRadius: 58,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  }
});
