import { Text, View } from 'react-native';
import tw from 'tailwind-rn';
import * as Linking from 'expo-linking';

export default function App() {
  const url = Linking.useURL();
  const { hostname, path, queryParams } = Linking.parse(url + '');

  return (
    <View style={tw('flex-1 items-center justify-center')}>
      <Text style={tw('text-3xl')}>
        HAIP app hostname:{hostname} path:{path} queryParams:
        {JSON.stringify(queryParams, undefined, 2)}
      </Text>
    </View>
  );
}
