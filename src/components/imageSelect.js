import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { ImagePicker } from 'expo';
import { EvilIcons } from '@expo/vector-icons';

export default class ImageSelect extends React.Component {
  state = {
    image: null,
    uploading: false,
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello {this.props.name}!</Text>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            onPress={this._takePhoto}
            style={styles.circle}>
            <EvilIcons name="camera" size={86} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._selectPhoto}
            style={styles.circle}>
            <EvilIcons name="image" size={86} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3]
    });

    this.props.imageHandler(pickerResult);
  }

  _selectPhoto = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3]
    });

    this.props.imageHandler(pickerResult);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row'
  },
  circle: {
    width: 118,
    height: 118,
    borderRadius: 59,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderWidth: 3,
    borderColor: 'white'
  },
  title: {
    fontSize: 25,
    color: 'white',
    marginBottom: 30
  }
});

