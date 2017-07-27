import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Linking,
} from 'react-native';
import { loginToMicrosoft, handleRedirect } from '../helpers/oAuth'
import { SimpleLineIcons } from '@expo/vector-icons';

export default class Authentication extends React.Component {
	componentDidMount() {
		Linking.addEventListener('url', handleRedirect.bind(this));
	}
	render() {
		return (
			<View style={styles.container}>
			<Text
              style={styles.title}>
              Login
            </Text>
			<TouchableOpacity
				onPress={loginToMicrosoft}
				style={styles.circle}>
				<SimpleLineIcons name="login" size={40} color="white" />
			</TouchableOpacity>
			</View>
		);
	}
	
	_updateState(newState) {
		this.props.updateState(newState);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center'
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
		marginBottom: 30,
		justifyContent: 'center'
	}
});
