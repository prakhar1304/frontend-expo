import Header from "@/components/Header"
import RecordsScreen from "@/components/RecordScreen"
import { View, StyleSheet, SafeAreaView, StatusBar } from "react-native"


const Records = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"  />
      <View style={styles.content}>
        <Header />
        <RecordsScreen />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    marginTop: 30,
    // paddingHorizontal: 16,
  },
})

export default Records

