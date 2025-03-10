import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import type { Report } from "../data/reportData"
import TypeBadge from "./TypeBadge"


interface RecordCardProps {
  report: Report
}

const RecordCard = ({ report }: RecordCardProps) => {
  const renderDetails = () => {
    return Object.entries(report.additionalDetails).map(([key, value], idx) => (
      <View key={idx} style={styles.detailItem}>
        <Text style={styles.detailKey}>{key} :</Text>
        {Array.isArray(value) ? (
          <View style={styles.listContainer}>
            {value.map((item, i) => (
              <Text key={i} style={styles.detailValue}>
                • {item}
              </Text>
            ))}
          </View>
        ) : (
          <Text style={styles.detailValue}>{String(value)}</Text>
        )}
      </View>
    ))
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{report.title}</Text>
        <TypeBadge type={report.type} />
      </View>

      <View style={styles.divider} />

      <View style={styles.descriptionContainer}>
        <View style={styles.iconContainer}>
          <Feather name="file-text" size={20} color="#4285F4" />
        </View>
        <Text style={styles.description}>{report.description}</Text>


        <View style={styles.doctorContainer}>
          <Feather name="user" size={18} color="#4285F4" />
          <Text style={styles.doctorText}>{report.doctor}</Text>
        </View>
      </View>
  

      <View style={styles.contentRow}>
      {/* <View style={styles.divider} ></View> */}
      <View style={styles.detailsContainer}>{renderDetails()}</View>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: report.image }}
          style={styles.image}
          defaultSource={require("../assets/images/R.jpeg")}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.viewReportButton}>
          <Text style={styles.viewReportText}>View Report</Text>
        </TouchableOpacity>
      </View>

      </View>

      <View style={styles.footer}>
        

        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.viewAllText}>View all</Text>
          <Feather name="chevron-down" size={18} color="#4285F4" />
        </TouchableOpacity>
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    marginLeft: -43,
    marginTop:50,
    // borderColor:"black",
    // borderWidth:1,
    zIndex:2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#BAD4FC",
    marginBottom: 12,
    width: "50%",
  },
  descriptionContainer: {
    flexDirection: "row",
    marginBottom: 16,

  },
  iconContainer: {
    width: 24,
    marginRight: 8,
  },
  description: {
    flex: 1,
    fontSize: 14,
    color: "#666",
  },
  detailsContainer: {
    marginBottom: 16,
   
    width: "50%",
  },
  detailItem: {
    marginBottom: 8,
  },
  detailKey: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  listContainer: {
    paddingLeft: 8,
  },
  imageContainer: {
    alignItems: "center",
    // marginBottom: 16,
    width: 130,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 170,
    borderRadius: 8,
    marginBottom: 8,
  },
  viewReportButton: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    
   
  },
  viewReportText: {
    color: "#4285F4",
    fontWeight: "600",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

  },
  doctorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  doctorText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    color: "#4285F4",
    marginRight: 4,
    fontSize: 16,
    fontWeight: "600",
  },
  contentRow:{
    flexDirection: "row",
    justifyContent: "space-between",
  }
})

export default RecordCard

