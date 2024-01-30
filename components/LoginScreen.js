import React, { useEffect } from 'react';
import { Button, Platform, Text, TouchableOpacity, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession(); // <-- will close web window after authentication

const useProxy = Platform.select({ web: false, default: true });

const client_id = 1549638612467250;
const redirect_uri = "https://auth.expo.io/@drnguillaume/lite";
const scope = "user_profile,user_media";
const site = "https://api.instagram.com/oauth/authorize?client_id=" + client_id + "&redirect_uri=" + redirect_uri + "&scope=" + scope + "&response_type=code&state=1";
const discovery = { authorizationEndpoint: site }

const GetInstagram = () => {


  const [request, response, promptAsync] = useAuthRequest({
    redirectUri: makeRedirectUri({
      useProxy,
      native: redirect_uri
    }),
    scopes: [scope],
    clientId: client_id
  }, discovery);


  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log("code : ", code);
      alert(code);
    }
  }, [response]);



  return (
      <View>
        <TouchableOpacity onPress={ () => promptAsync({useProxy,windowFeatures: { width: 700, height: 600 }}) }>
          <Text>Connect Your Instagram</Text>
        </TouchableOpacity>
      </View>
  )
}

export default GetInstagram;