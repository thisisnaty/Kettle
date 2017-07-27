import React from 'react';
import { View, Image, StyleSheet, Button, TouchableOpacity, Text } from 'react-native';
import { BlurView } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';

export default class EventDescription extends React.Component {
  render() {
    return (
      <View style={styles.imageContainer}>
        <Image
            style={styles.image} 
            source={{uri: this.props.imageUri}} />
        <BlurView tint="default" intensity={93} style={StyleSheet.absoluteFill}>    

        </BlurView>
        <View style={styles.fullscreenView}>
          <TouchableOpacity
            onPress={this.props.startAgain}
            style={styles.touchable}>
            <Text
              style={styles.title}>
              Success!
            </Text>
          <View
            style={styles.circle}>
              <MaterialIcons name="check" size={40} color="white"/>
          </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {
    alignItems: 'center'
  },
  container: {
    flex: 1
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderWidth: 3,
    borderColor: 'white',
  },
  fullscreenView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 25,
    color: 'white',
    justifyContent: 'center'
  }
});

