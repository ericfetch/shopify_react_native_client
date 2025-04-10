
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from 'react-native-elements';

// 模拟获取商品详情
const fetchProductDetails = async (id) => {
  // 实际项目中应替换为真实API调用
  return {
    id: id,
    title: '经典T恤',
    price: '99.99',
    description: '舒适的100%纯棉T恤，适合日常穿着。',
    image: 'https://example.com/tshirt.jpg'
  };
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadProductDetails = async () => {
      const details = await fetchProductDetails(id);
      setProduct(details);
    };
    loadProductDetails();
  }, [id]);

  const addToCart = () => {
    // 实现添加到购物车逻辑
    router.push('/cart');
  };

  if (!product) return <Text>加载中...</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productPrice}>¥{product.price}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        
        <Button 
          title="添加到购物车" 
          onPress={addToCart}
          buttonStyle={styles.addToCartButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  productImage: {
    width: '100%',
    height: 400,
  },
  detailsContainer: {
    padding: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 20,
    color: '#f4511e',
    marginVertical: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: '#f4511e',
    borderRadius: 10,
  },
});
