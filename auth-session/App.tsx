import { Text, View, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import tw from 'tailwind-rn';

WebBrowser.maybeCompleteAuthSession();

export const auth = async (authUrl: string, redirectUrl: string) => {
  const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl);

  if (result.type === 'cancel') {
    return 'cancel';
  } else if (result.type === 'success') {
    if (!result.url || result.url.indexOf('fail') > -1) {
      return 'fail';
    }

    return result.url;
  }
};

export default function App() {
  const [url, setUrl] = useState('');
  const redirectUri = Linking.createURL('auth');
  const authUrl = `https://tw-isid-test.web.app/authsess?redirect_uri=${redirectUri}`;
  console.log(authUrl);
  const onPress = async () => {
    const url = (await auth(authUrl, redirectUri)) || '';
    setUrl(url);
    console.log('result:', url);
  };
  return (
    <View style={tw('flex-1')}>
      <Text>
        redirectUri: {redirectUri} url: {url}
      </Text>
      <TouchableOpacity
        style={tw(`mb-4 mx-3 rounded-3xl w-11/12 bg-gray-500`)}
        onPress={onPress}
      >
        <Text style={tw(`text-center text-lg font-semibold p-2 text-white`)}>
          Auth
        </Text>
      </TouchableOpacity>
    </View>
  );
}
