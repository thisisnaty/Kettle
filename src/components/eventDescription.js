import React from 'react';
import { View, Image, StyleSheet } from 'react-native';


export default class EventDescription extends React.Component {
  render() {
    return (
      <View style={styles.imageContainer}>
        <Image 
          style={styles.image} 
          source={{uri: this.props.imageUri}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  image: {
    flex: 1
  }
});

