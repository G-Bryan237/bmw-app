import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'index':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'compare':
              iconName = focused ? 'git-compare' : 'git-compare-outline';
              break;
            case 'saved':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'dealers':
              iconName = focused ? 'location' : 'location-outline';
              break;
            case 'profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-outline';
          }
          return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0066B2',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 0,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: '#000000',
        },
        headerTintColor: '#fff',
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="compare" />
      <Tabs.Screen name="saved" />
      <Tabs.Screen name="dealers" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}