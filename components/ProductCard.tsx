import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface ProductCardProps {
  item: {
    id: string;
    title: string;
    price: string;
    rating: string;
    image: string;
  };
}

export default function ProductCard({ item }: ProductCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => router.push(`/products/${item.id}`)}
    >
      <View style={styles.productImageContainer}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.productImage} 
          resizeMode="cover"
        />
      </View>
      <View style={styles.productDetails}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <View style={styles.ratingContainer}>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productCard: {
    width: (width - 30) / 2,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productDetails: {
    padding: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f4511e',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    marginRight: 5,
  },
  star: {
    color: '#f4511e',
  },
});