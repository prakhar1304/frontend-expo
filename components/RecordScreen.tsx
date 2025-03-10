import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"

import { reportData } from "../data/reportData"
import FilterButton from "./FilterButton"
import TimelineItem from "./TimelineItem"
import RecordCard from "./RecordCard"

const RecordsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Records</Text>

      <View style={styles.filterContainer}>
        <FilterButton title="Doctor" />
        <FilterButton title="Disease" />
        <FilterButton title="Records Type" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.yearContainer}>
          <TouchableOpacity style={styles.yearButton}>
            <Text style={styles.yearText}>2025</Text>
          </TouchableOpacity>
        </View>

        {reportData.map((report, index) => (
          <TimelineItem key={index} date={report.date} isLast={index === reportData.length - 1}>
            <RecordCard report={report} />
          </TimelineItem>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  yearContainer: {
    marginBottom: 10,
    alignItems: "flex-start",
    
  },
  yearButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: "#1F1F1F",
  },
  yearText: {
    fontSize: 18,
    fontWeight: "800",
  },
})

export default RecordsScreen

