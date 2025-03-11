import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { Feather, FontAwesome5 } from "@expo/vector-icons"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Header = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.qrButton}>
   
        <MaterialIcons name="qr-code-scanner" size={29} color="#333" />
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="search" placeholderTextColor="#666" />
        <TouchableOpacity style={styles.micButton}>
          <Feather name="mic" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.notificationButton}>
        <Feather name="bell" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 1,
    paddingHorizontal: 4,
    marginTop:15
  },
  qrButton: {
    padding: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 10,
    marginHorizontal: 12,
    paddingHorizontal: 16,
    height: 46,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  micButton: {
    padding: 4,
  },
  notificationButton: {
    padding: 8,
  },
})

export default Header

