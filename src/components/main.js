import React from 'react';
import ImageSelect from './imageSelect';
import EventDescription from './eventDescription';
import { ActivityIndicator, 
         Image, 
         StyleSheet, 
         View,
         Linking } from 'react-native';
import { LinearGradient, FileSystem } from 'expo';
import { uploadImageAsync } from '../helpers/imageUploader'; 
import { parseJsonToIcs } from '../helpers/icsParser';

export default class Main extends React.Component {
  state = {
    imageUri: null,
    uploading: false,
    uploaded: false
  }
  render() {
    let renderResult = null;
    let renderBackground = null;

    if (!this.state.uploading) {
      if (this.state.uploaded) {
        renderResult = <EventDescription imageUri={this.state.imageUri} startAgain={this._startAgain.bind(this)} />;
      } else {
        renderResult = <ImageSelect imageHandler={this._handleImagePicked.bind(this)}/>;
      }
    }

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["rgb(30,87,153)", "rgb(32,124,202)", "rgb(125,185,232)"]}
          style={styles.container}>
        {renderResult}
        </LinearGradient>
      </View>
    );
  }

  _handleImagePicked = async (pickerResult) => {
    let uploadResponse, uploadResult;
    
    try {
      this.setState({uploading: true});

      if(!pickerResult.cancelled) {
        this.setState({imageUri: pickerResult.uri, uploaded: true });
        
        uploadImageAsync(pickerResult.uri).then((uploadResponse) => {
          return uploadResponse.json();
        }).then((jsonResponse) => {
          this.setState({uploading: false});
          return this._manageEventAsync(jsonResponse);
        });
      }
    } catch(e) {
      console.log({uploadResponse});
      console.log({uploadResult});
      console.log({e});
      this.setState({imageUri: null, uploaded: false});
      alert("There was an error, please try again.")
    } finally {
      this.setState({uploading: false});
    }
  }

  _startAgain = () => {
    this.setState({
      imageUri: null,
      uploading: false,
      uploaded: false
    });
  }

  _manageEventAsync = async (json) => {
    console.log(json);
    
    var path = FileSystem.documentDirectory + '/' + 
      json.Name.split(" ").join("-") + 
      Math.random().toString(36).substr(2, 3) + '.ics';
    
    return FileSystem.writeAsStringAsync(path, parseJsonToIcs(json))
      .then(() => {
        //Linking.openURL('ical://' + path);
        //console.log(path);
      })
      .catch((err) => {
        console.log("Error on creating ics");
        console.log(err);
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0
  }
});


