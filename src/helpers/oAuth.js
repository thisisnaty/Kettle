import Expo from 'expo';
import { Config } from '../../env.js'
import jwtDecoder from 'jwt-decode';

let redirectUri;
if (Expo.Constants.manifest.xde) {
  // Hi there, dear reader!
  // This value needs to be the tunnel url for your local Expo project.
  // It also needs to be listed in valid callback urls of your Auth0 Client
  // Settings. See the README for more information.
  redirectUri = Config.REDIRECT_URI;
} else {
  redirectUri = `${Expo.Constants.linkingUri}/redirect`;
}

export async function loginToMicrosoft() {
	const redirectionURL = `${Config.AUTH0_DOMAIN}/${Config.TENANT_ID}/oauth2/authorize` + _toQueryString({
		client_id: Config.AUTH0_CLIENT,
		response_type: 'code',
		redirect_uri: redirectUri,
		state: redirectUri,
		resource: 'https://graph.microsoft.com/'
	});
	Expo.WebBrowser.openBrowserAsync(redirectionURL);
}

export async function handleRedirect(event) {
	// Get access code
	if (!event.url.includes('+/redirect')) {
		return;
	}
	Expo.WebBrowser.dismissBrowser();
	const [, queryString] = event.url.split('?');
	const responseObj = queryString.split('&').reduce((map, pair) => {
		const [key, value] = pair.split('=');
		map[key] = value; // eslint-disable-line
		return map;
	}, {});

	let formData = new FormData();
	formData.append('client_id', Config.AUTH0_CLIENT);
	formData.append('code', responseObj.code);
	formData.append('grant_type', 'authorization_code');
	formData.append('redirect_uri', redirectUri);
	formData.append('resource', 'https://graph.microsoft.com');

	// Request access token
	return fetch(`${Config.AUTH0_DOMAIN}/${Config.TENANT_ID}/oauth2/token`, {
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-ww-form-urlenconded'
		},
		body: formData
	})
		.then((response) => {
			return response.json()
				.then((responseJson) => {
					this._updateState({ accessToken: responseJson.access_token });
					return jwtDecoder(responseJson.id_token)
				})
				.then((decodedToken) => {
					this._updateState({ name: `${decodedToken.given_name}`, 
					isLogin: true });
				})
		});
}

/**
 * Converts an object to a query string.
 */
function _toQueryString(params) {
	return '?' + Object.entries(params)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join('&');
}
