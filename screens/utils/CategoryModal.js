import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const modalWidth = width - 30; // Assuming 20 is marginHorizontal in Card
const itemWidth = modalWidth / 4;

export const categoriesData = [
  { id: 1, name: 'Development', icon: 'developer-board' },
  { id: 2, name: 'Dining', icon: 'food-outline' },
  { id: 3, name: 'Donation', icon: 'hand-coin-outline' },
  { id: 4, name: 'Education', icon: 'school-outline' },
  { id: 5, name: 'Electronics', icon: 'devices' },
  { id: 6, name: 'Recreation', icon: 'theater' },
  { id: 7, name: 'Groceries', icon: 'cart-variant' },
  { id: 8, name: 'Healthcare', icon: 'medical-bag' },
  { id: 9, name: 'Hobbies', icon: 'electron-framework' },
  { id: 10, name: 'Investments', icon: 'finance' },
  { id: 11, name: 'Savings', icon: 'piggy-bank-outline' },
  { id: 12, name: 'Selfcare', icon: 'spa-outline' },
  { id: 13, name: 'Social', icon: 'account-group-outline' },
  { id: 14, name: 'Travel', icon: 'train-car' },
  { id: 15, name: 'Utility', icon: 'home-outline' },
  { id: 16, name: 'TRAC', icon: 'bank-transfer' },
  { id: 17, name: 'POBO', icon: 'transit-transfer' },
  { id: 18, name: 'MISC', icon: 'puzzle-outline' },
];

export const CategoryModal = ({ showModal, toggleModal, selectCategory }) => {
  return (
    <Modal visible={showModal} animationType="fade" transparent={true}>
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={toggleModal}
          activeOpacity={1}
        >
          <View style={[styles.modalContent, { width: modalWidth }]}>
            <View style={styles.row}>
              {categoriesData.slice(0, 4).map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.categoryItem, { width: itemWidth }]}
                  onPress={() => selectCategory(category)}
                >
                  <Icon name={category.icon} size={40} color={'black'} />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              {categoriesData.slice(4, 8).map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.categoryItem, { width: itemWidth }]}
                  onPress={() => selectCategory(category)}
                >
                  <Icon name={category.icon} size={40} color={'black'} />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              {categoriesData.slice(8, 12).map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.categoryItem, { width: itemWidth }]}
                  onPress={() => selectCategory(category)}
                >
                  <Icon name={category.icon} size={40} color={'black'} />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              {categoriesData.slice(12, 16).map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.categoryItem, { width: itemWidth }]}
                  onPress={() => selectCategory(category)}
                >
                  <Icon name={category.icon} size={40} color={'black'} />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              {categoriesData.slice(16).map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.categoryItem, { width: itemWidth }]}
                  onPress={() => selectCategory(category)}
                >
                  <Icon name={category.icon} size={40} color={'black'} />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: modalWidth,
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryName: {
    marginTop: 10,
    textAlign: 'center',
  },
});
