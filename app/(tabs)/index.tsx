// app/(tabs)/index.tsx
import { View, Text, ScrollView, TouchableOpacity, Image, ImageBackground, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type QuickFilterProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

type FeatureCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
};

interface BMWModel {
  id: string;
  name: string;
  price: string;
  imageSource: any;
}

const QuickFilter = ({ title, icon, onPress }: QuickFilterProps) => (
  <TouchableOpacity 
    className="flex-1 bg-gray-900 rounded-xl p-4 mx-2"
    onPress={onPress}
  >
    <View className="items-center">
      <Ionicons name={icon} size={24} color="#0066B2" />
      <Text className="text-white text-center mt-2 font-semibold">{title}</Text>
    </View>
  </TouchableOpacity>
);

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <View className="w-1/2 p-4">
    <View className="bg-gray-900 rounded-xl p-4">
      <Ionicons name={icon} size={32} color="#0066B2" />
      <Text className="text-white font-bold mt-2">{title}</Text>
      <Text className="text-gray-400 text-sm mt-1">{description}</Text>
    </View>
  </View>
);

export default function Home() {
  const featuredModels: BMWModel[] = [
    {
      id: 'x7',
      name: 'BMW X7',
      price: 'Starting at $77,850',
      imageSource: require('../../assets/bmw-x7.jpg')
    },
    {
      id: '7series',
      name: 'BMW 7 Series', 
      price: 'Starting at $93,300',
      imageSource: require('../../assets/bmw-7series.jpg')
    },
    {
      id: 'xm',
      name: 'BMW XM',
      price: 'Starting at $159,995', 
      imageSource: require('../../assets/bmw-xm.jpg')
    }
  ];

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <SafeAreaView 
        className="flex-1 bg-black" 
        edges={['right', 'left']} // Only apply safe area to left and right edges
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-2 border-b border-gray-800">
          <Image
            source={require('../../assets/bmw-logo.png')}
            className="w-12 h-12"
            resizeMode="contain"
          />
          <Text className="text-white text-sm font-medium">Your Ultimate BMW Companion</Text>
          <TouchableOpacity>
            <Ionicons name="person-circle-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1">
          {/* Hero Section */}
          <ImageBackground
            source={require('../../assets/hero-car.jpg')}
            className="h-72 justify-end p-4"
          >
            <View className="bg-black/50 rounded-xl p-4">
              <Text className="text-white text-2xl font-bold">
                Luxury, Redefined. Performance, Unmatched.
              </Text>
              <View className="flex-row mt-4">
                <TouchableOpacity className="bg-[#0066B2] rounded-full px-6 py-3 mr-4">
                  <Text className="text-white font-semibold">Explore Models</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-white rounded-full px-6 py-3">
                  <Text className="text-black font-semibold">Find a Dealer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>

          {/* Quick Filters */}
          <View className="px-4 py-6">
            <Text className="text-white text-xl font-bold mb-4">Quick Filters</Text>
            <View className="flex-row">
              <QuickFilter
                title="Budget-Friendly"
                icon="wallet-outline"
                onPress={() => {}}
              />
              <QuickFilter
                title="Electric Vehicles"
                icon="flash-outline"
                onPress={() => {}}
              />
              <QuickFilter
                title="Performance Cars"
                icon="speedometer-outline"
                onPress={() => {}}
              />
            </View>
          </View>

          {/* Search Bar */}
          <View className="px-4 mb-6">
            <TouchableOpacity className="bg-gray-900 rounded-full flex-row items-center px-4 py-3">
              <Ionicons name="search" size={20} color="#666" />
              <Text className="text-gray-400 ml-2">Search by model, feature, or budget...</Text>
            </TouchableOpacity>
          </View>

          {/* Featured Models */}
          <View className="mb-6">
            <Text className="text-white text-xl font-bold px-4 mb-4">Featured Models</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              className="px-4"
            >
              {featuredModels.map((model) => (
                <TouchableOpacity
                  key={model.id}
                  className="mr-4 bg-gray-900 rounded-xl overflow-hidden w-72"
                >
                  <Image
                    source={model.imageSource}
                    className="w-full h-40"
                    resizeMode="cover"
                  />
                  <View className="p-4">
                    <Text className="text-white text-xl font-bold">{model.name}</Text>
                    <Text className="text-gray-400">{model.price}</Text>
                    <TouchableOpacity className="bg-[#0066B2] rounded-full px-4 py-2 mt-3">
                      <Text className="text-white text-center">View Details</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Why BMW Section */}
          <View className="px-4 mb-6">
            <Text className="text-white text-xl font-bold mb-4">Why BMW?</Text>
            <View className="flex-row flex-wrap">
              <FeatureCard
                icon="speedometer-outline"
                title="Performance"
                description="Unmatched power and precision engineering"
              />
              <FeatureCard
                icon="bulb-outline"
                title="Innovation"
                description="Pioneering electric and autonomous driving tech"
              />
              <FeatureCard
                icon="diamond-outline"
                title="Luxury"
                description="Premium interiors crafted for ultimate comfort"
              />
              <FeatureCard
                icon="leaf-outline"
                title="Sustainability"
                description="Eco-friendly cars with reduced emissions"
              />
            </View>
          </View>

          {/* Promotions Section */}
          <View className="px-4 mb-8">
            <TouchableOpacity className="bg-gray-900 rounded-xl p-6">
              <Text className="text-white text-lg font-bold">Special Offer</Text>
              <Text className="text-gray-400 mt-2">
                Get 0.9% APR Financing on Certified Pre-Owned BMWs!
              </Text>
              <TouchableOpacity className="bg-[#0066B2] rounded-full px-4 py-2 mt-4 self-start">
                <Text className="text-white">Learn More</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}