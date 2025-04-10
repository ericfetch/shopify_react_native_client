import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  Modal,
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import ProductCard from '@/components/ProductCard';
import shopifyClient from '@/shopify';

const { width } = Dimensions.get('window');

export default function ProductListScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('New York, USA');
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // 获取所有产品
        const products = await shopifyClient.product.fetchAll();
        
        // 转换产品数据，添加更严格的数据检查
        const formattedProducts = products.map(product => ({
          id: product.id?.toString() || 'unknown', // 确保 id 存在且为字符串
          title: product.title || '未命名商品', // 提供默认标题
          price: product.variants?.[0]?.price 
            ? `¥${product.variants[0].price.amount}` 
            : '价格待定',
          image: product.images?.[0]?.src || 'https://via.placeholder.com/150', // 提供占位图
          description: product.description || '暂无描述',
        })).filter(product => product.id !== 'unknown'); // 过滤掉无效商品

        setProducts(formattedProducts);
        setLoading(false);
      } catch (error) {
        console.error('获取商品失败:', error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // 新增过滤逻辑
  const filterTypes = ['All', 'New', 'Men', 'Women', 'Kids'];

  // 可用的位置列表
  const locations = [
    'New York, USA',
    'Los Angeles, USA', 
    'Chicago, USA',
    'San Francisco, USA',
    '北京, 中国',
    '上海, 中国',
    '广州, 中国',
    '深圳, 中国'
  ];



  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>加载商品中...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.locationContainer} 
              onPress={() => setLocationModalVisible(true)}
            >
              <Text style={styles.location}>{selectedLocation}</Text>
              <Text style={styles.locationDropdownIcon}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* 位置选择模态框 */}
          <Modal
            transparent={true}
            visible={isLocationModalVisible}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>选择位置</Text>
                <FlatList
                  data={locations}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.locationItem}
                      onPress={() => {
                        setSelectedLocation(item);
                        setLocationModalVisible(false);
                      }}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item}
                />
                <TouchableOpacity 
                  style={styles.closeModalButton}
                  onPress={() => setLocationModalVisible(false)}
                >
                  <Text style={styles.closeModalButtonText}>取消</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="搜索商品"
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#999"
              />
              <TouchableOpacity 
                style={styles.searchIcon}
                onPress={() => {
                  // 执行搜索逻辑
                  console.log('搜索:', searchQuery);
                }}
              >
                <Text style={styles.searchIconText}>🔍</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          <View style={styles.newCollection}>
            <Text style={styles.newCollectionTitle}>New Collection</Text>
            <Text style={styles.newCollectionDiscount}>Discount 50% for the first transaction</Text>
            <TouchableOpacity style={styles.shopNowButton}>
              <Text style={styles.shopNowText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.categoryTitle}>Category</Text>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryItem}>T-Shirt</Text>
            <Text style={styles.categoryItem}>Pant</Text>
            <Text style={styles.categoryItem}>Dress</Text>
            <Text style={styles.categoryItem}>Jacket</Text>
          </View>

          <Text style={styles.flashSaleTitle}>Flash Sale</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer}
          >
            {filterTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterItem,
                  selectedFilter === type.toLowerCase() && styles.selectedFilterItem
                ]}
                onPress={() => setSelectedFilter(type.toLowerCase())}
              >
                <Text style={[
                  styles.filterItemText,
                  selectedFilter === type.toLowerCase() && styles.selectedFilterItemText
                ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.productContainer}>
            {
              products.map(item=>{
                return <ProductCard item={item}/> 
              })
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding:10,
    paddingTop: Platform.OS === 'android' 
      ? StatusBar.currentHeight || 0  // 明确为 Android 添加状态栏高度的内边距
      : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBlock:4,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },
  searchIcon: {
    padding: 5,
  },
  searchIconText: {
    fontSize: 18,
  },
  newCollection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  newCollectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  newCollectionDiscount: {
    fontSize: 14,
    color: '#666',
  },
  shopNowButton: {
    backgroundColor: '#f4511e',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  shopNowText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryItem: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  flashSaleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  filterContainer: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  filterItem: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedFilterItem: {
    backgroundColor: '#f4511e',
  },
  filterItemText: {
    color: '#666',
    fontWeight: '500',
  },
  selectedFilterItemText: {
    color: '#fff',
  },
  locationContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  locationDropdownIcon: {
    marginLeft: 5,
    fontSize: 12,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  locationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeModalButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f4511e',
    borderRadius: 5,
  },
  closeModalButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  productCard: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  }
});