import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Car {
  id: string;
  name: string;
  imageUrl: string;
  horsepower?: string;
  torque?: string;
  topSpeed?: string;
  zeroToSixty?: string;
  mpg?: string;
  fuelType?: string;
  co2Emissions?: string;
  exteriorColors?: string[];
  interiorMaterials?: string[];
  seatingCapacity?: number;
  screenSize?: string;
  idriveSystem?: string;
  safetyFeatures?: string[];
  basePrice?: number;
  financingOptions?: string[];
  monthlyPayment?: number;
}

const CompareScreen = () => {
  const [selectedCars, setSelectedCars] = useState<(Car | null)[]>([null, null, null]);

  const renderComparisonSlot = (index: number) => {
    const car = selectedCars[index];
    
    return (
      <TouchableOpacity 
        style={styles.comparisonSlot}
        onPress={() => {/* Open car selector modal */}}
      >
        {!car ? (
          <View style={styles.emptySlot}>
            <Ionicons name="add-circle-outline" size={40} color="#0066B2" />
            <Text style={styles.addCarText}>Add Car to Compare</Text>
          </View>
        ) : (
          <View style={styles.filledSlot}>
            <Image
              style={styles.carThumbnail}
              source={{ uri: car.imageUrl }}
            />
            <Text style={styles.carName}>{car.name}</Text>
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => {
                const newCars = [...selectedCars];
                newCars[index] = null;
                setSelectedCars(newCars);
              }}
            >
              <Ionicons name="close-circle" size={24} color="#D22828" />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderComparisonTable = () => {
    const categories = [
      {
        title: 'Performance',
        specs: ['Horsepower', 'Torque', 'Top Speed', '0-60 mph']
      },
      {
        title: 'Efficiency',
        specs: ['MPG', 'Fuel Type', 'CO2 Emissions']
      },
      {
        title: 'Design',
        specs: ['Exterior Colors', 'Interior Materials', 'Seating Capacity']
      },
      {
        title: 'Tech Features',
        specs: ['Screen Size', 'iDrive System', 'Safety Features']
      },
      {
        title: 'Pricing',
        specs: ['Base Price', 'Financing Options', 'Monthly Payment']
      }
    ];

    return (
      <View style={styles.comparisonTable}>
        {categories.map((category, index) => (
          <View key={`category-${index}`} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            {category.specs.map((spec, specIndex) => (
              <View key={`spec-${specIndex}`} style={styles.specRow}>
                <Text style={styles.specLabel}>{spec}</Text>
                <View style={styles.specValues}>
                  {selectedCars.map((car, carIndex) => (
                    <Text key={`value-${carIndex}`} style={styles.specValue}>
                      {car ? (car as any)[spec.toLowerCase()] || '-' : '-'}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../assets/bmw-logo.png')}
        />
        <Text style={styles.title}>Compare Your BMWs</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.selectionArea}>
          {selectedCars.map((_, index) => (
            <React.Fragment key={`slot-${index}`}>
              {renderComparisonSlot(index)}
            </React.Fragment>
          ))}
        </View>

        {renderComparisonTable()}

        <View style={styles.ctaContainer}>
          {selectedCars.map((car, index) => (
            car && (
              <View key={`cta-${index}`} style={styles.carCTA}>
                <TouchableOpacity style={styles.ctaButton}>
                  <Text style={styles.ctaButtonText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ctaButton}>
                  <Text style={styles.ctaButtonText}>Locate Dealer</Text>
                </TouchableOpacity>
              </View>
            )
          ))}
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
  },
  selectionArea: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  comparisonSlot: {
    flex: 1,
    height: 160,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  emptySlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  addCarText: {
    color: '#FFFFFF',
    marginTop: 8,
    textAlign: 'center',
  },
  filledSlot: {
    flex: 1,
    position: 'relative',
  },
  carThumbnail: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  carName: {
    color: '#FFFFFF',
    padding: 8,
    textAlign: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  comparisonTable: {
    padding: 16,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  specRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  specLabel: {
    flex: 1,
    color: '#B0B0B0',
  },
  specValues: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  specValue: {
    flex: 1,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  ctaContainer: {
    padding: 16,
    gap: 16,
  },
  carCTA: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  ctaButton: {
    backgroundColor: '#0066B2',
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CompareScreen;