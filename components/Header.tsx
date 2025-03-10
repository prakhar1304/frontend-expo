import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { Feather, FontAwesome5 } from "@expo/vector-icons"

const Header = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.qrButton}>
        <FontAwesome5 name="qrcode" size={24} color="#333" />
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
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  qrButton: {
    padding: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 30,
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

