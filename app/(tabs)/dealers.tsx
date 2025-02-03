// app/(tabs)/saved.tsx
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Saved() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-xl">Saved Screen</Text>
      </View>
    </SafeAreaView>
  );
}