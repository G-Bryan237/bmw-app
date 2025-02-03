import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SavedScreen = () => {
  const [activeTab, setActiveTab] = useState('comparisons');
  const [searchQuery, setSearchQuery] = useState('');

  // Added proper data management
  const [savedComparisons] = useState([
    {
      id: '1',
      title: 'X5 vs X7 vs iX',
      cars: [
        { id: '1', imageUrl: 'x5-url' },
        { id: '2', imageUrl: 'x7-url' },
        { id: '3', imageUrl: 'ix-url' },
      ],
      dateSaved: 'Saved on Jan 25, 2025',
    },
    // Add more comparisons as needed
  ]);

  const [savedConfigurations] = useState([
    {
      id: '1',
      carModel: 'BMW i7',
      name: 'Luxury Build',
      summary: 'Black Sapphire, 20" Wheels, Cream Interior',
      price: 'Estimated: $125,000',
      imageUrl: './motor.jpg',
    },
    // Add more configurations as needed
  ]);

  const [savedFavorites] = useState([
    {
      id: '1',
      name: 'BMW X5',
      priceRange: 'Starting at $65,000',
      imageUrl: 'x5-url',
    },
    // Add more favorites as needed
  ]);

  const tabs = [
    { id: 'comparisons', label: 'Saved Comparisons' },
    { id: 'configurations', label: 'Saved Configurations' },
    { id: 'favorites', label: 'Favorite Cars' },
  ];

  // Added search filtering
  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return {
      comparisons: savedComparisons.filter(item => 
        item.title.toLowerCase().includes(query)
      ),
      configurations: savedConfigurations.filter(item =>
        item.carModel.toLowerCase().includes(query) || 
        item.name.toLowerCase().includes(query)
      ),
      favorites: savedFavorites.filter(item =>
        item.name.toLowerCase().includes(query)
      ),
    };
  }, [searchQuery, savedComparisons, savedConfigurations, savedFavorites]);

  const renderComparisonCard = (comparison: { id: string; title: string; cars: { id: string; imageUrl: string }[]; dateSaved: string }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{comparison.title}</Text>
      <View style={styles.carImages}>
        {comparison.cars.map((car, index) => (
          <Image
            key={index}
            style={styles.carThumbnail}
            source={{ uri: car.imageUrl }}
          />
        ))}
      </View>
      <Text style={styles.dateText}>{comparison.dateSaved}</Text>
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Comparison</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={24} color="#D22828" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderConfigurationCard = (config: { id: string; carModel: string; name: string; summary: string; price: string; imageUrl: string }) => (
    <View style={styles.card}>
      <Image style={styles.configImage} source={{ uri: config.imageUrl }} />
      <Text style={styles.cardTitle}>{config.carModel}</Text>
      <Text style={styles.configName}>{config.name}</Text>
      <Text style={styles.configSummary}>{config.summary}</Text>
      <Text style={styles.priceText}>{config.price}</Text>
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Edit Configuration</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFavoriteCard = (car: { id: string; name: string; priceRange: string; imageUrl: string }) => (
    <View style={styles.favoriteCard}>
      <Image style={styles.favoriteImage} source={{ uri: car.imageUrl }} />
      <Text style={styles.cardTitle}>{car.name}</Text>
      <Text style={styles.priceText}>{car.priceRange}</Text>
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Locate Dealer</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Ionicons name="heart" size={24} color="#D22828" />
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'comparisons':
        return (
          <ScrollView>
            {filteredData.comparisons.map((comparison) => (
              <View key={comparison.id}>
                {renderComparisonCard(comparison)}
              </View>
            ))}
          </ScrollView>
        );
      case 'configurations':
        return (
          <ScrollView>
            {filteredData.configurations.map((config) => (
              <View key={config.id}>
                {renderConfigurationCard(config)}
              </View>
            ))}
          </ScrollView>
        );
      case 'favorites':
        return (
          <View style={styles.favoriteGrid}>
            {filteredData.favorites.map((car) => (
              <View key={car.id}>
                {renderFavoriteCard(car)}
              </View>
            ))}
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../assets/bmw-logo.png')}
        />
        <Text style={styles.title}>My Saved Items</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#B0B0B0" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search saved items..."
          placeholderTextColor="#B0B0B0"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText,
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {renderContent()}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Add More Comparisons</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Explore Cars</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#FFFFFF',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0066B2',
  },
  tabText: {
    color: '#B0B0B0',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  carImages: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  carThumbnail: {
    width: 80,
    height: 60,
    borderRadius: 4,
  },
  dateText: {
    color: '#B0B0B0',
    fontSize: 12,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionButton: {
    backgroundColor: '#0066B2',
    padding: 8,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  deleteButton: {
    padding: 8,
  },
  configImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  configName: {
    color: '#B0B0B0',
    marginBottom: 4,
  },
  configSummary: {
    color: '#FFFFFF',
    marginBottom: 8,
  },
  priceText: {
    color: '#0066B2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  favoriteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  favoriteCard: {
    width: '48%',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 12,
    position: 'relative',
  },
  favoriteImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
    gap: 12,
  },
  footerButton: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default SavedScreen;