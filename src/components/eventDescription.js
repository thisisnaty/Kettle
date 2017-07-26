import React from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';

export default class EventDescription extends React.Component {
  render() {
    return (
      <View style={styles.imageContainer}>
        <Image 
          style={styles.image} 
          source={{uri: this.props.imageUri}} />
        <Button 
          onPress={this.props.startAgain}
          title="Start Again"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%'
  },
  image: {
    flex: 1
  }
});

