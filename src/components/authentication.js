import React from 'react';
import {
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
			<TouchableOpacity
				onPress={loginToMicrosoft}
				style={styles.circle}>
				<SimpleLineIcons name="login" size={40} color="white" />
			</TouchableOpacity>
		);
	}
	
	_updateState(newState) {
		this.props.updateState(newState);
	}
}

const styles = StyleSheet.create({
	circle: {
		width: 118,
		height: 118,
		borderRadius: 59,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 20,
		borderWidth: 3,
		borderColor: 'white'
	}
});
