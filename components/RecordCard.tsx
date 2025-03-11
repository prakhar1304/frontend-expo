import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from "react-native"
import { Feather } from "@expo/vector-icons"
import type { Report } from "../data/reportData"
import TypeBadge from "./TypeBadge"
import { useState } from "react"
import {
  moderateScale,
  scale,
  verticalScale
} from "react-native-size-matters"
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import FontAwesome from '@expo/vector-icons/FontAwesome';

interface RecordCardProps {
  report: Report
}

const RecordCard = ({ report }: RecordCardProps) => {
  const [expandedDetails, setExpandedDetails] = useState(false)

  const toggleDetails = () => setExpandedDetails(!expandedDetails)

  const renderDetails = () => {
    const detailsArray = Object.entries(report.additionalDetails)
    const itemsToShow = expandedDetails ? detailsArray.length : 2
    const visibleDetails = detailsArray.slice(0, itemsToShow)

    return visibleDetails.map(([key, value], idx) => (
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
          
          <FontAwesome name="hospital-o" size={moderateScale(20)} color="#4285F4" />
        </View>
        <Text style={styles.description}>{report.hospital}</Text>
        <View style={styles.doctorContainer}>
         
          <FontAwesome name="stethoscope" size={moderateScale(18)} color="#4285F4" />
          <Text style={styles.doctorText}>{report.doctor}</Text>
        </View>
      </View>

      <View style={styles.contentRow}>
        <View style={styles.detailsContainer}>{renderDetails()}</View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: report.image }}
            style={styles.image}
            defaultSource={require("../assets/images/Mail.png")}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.viewReportButton}  
            onPress={() => {
              // Replace with your navigation or viewer logic
              Linking.openURL(report.image)
            }}>
            <Text style={styles.viewReportText}>View Report</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        {Object.keys(report.additionalDetails).length > 2 && (
          <TouchableOpacity style={styles.moreButton} onPress={toggleDetails}>
            <Text style={styles.viewAllText}>
              {expandedDetails ? "View less" : "View all"}
            </Text>
            <Feather
              name={expandedDetails ? "chevron-up" : "chevron-down"}
              size={moderateScale(18)}
              color="#4285F4"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginLeft: moderateScale(-25),
    marginTop: moderateScale(30),
    zIndex: 2,
    marginRight: moderateScale(16)
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(12),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#BAD4FC",
    marginBottom: moderateScale(12),
    width: "50%",
  },
  descriptionContainer: {
    flexDirection: "row",
    marginBottom: moderateScale(16),
  },
  iconContainer: {
    width: moderateScale(24),
    marginRight: moderateScale(8),
  },
  description: {
    flex: 1,
    fontSize: moderateScale(14),
    color: "#666",
  },
  doctorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  doctorText: {
    marginLeft: moderateScale(8),
    fontSize: moderateScale(14),
    color: "#666",
  },
  detailsContainer: {
    marginBottom: moderateScale(16),
    width: "50%",
  },
  detailItem: {
    marginBottom: moderateScale(8),
  },
  detailKey: {
    fontSize: moderateScale(15),
    fontWeight: "bold",
    color: "#333",
    marginBottom: moderateScale(4),
  },
  detailValue: {
    fontSize: moderateScale(13),
    color: "#666",
    lineHeight: moderateScale(20),
  },
  listContainer: {
    paddingLeft: moderateScale(8),
  },
  imageContainer: {
    width: moderateScale(130),
    alignItems: "center",
    borderRadius: moderateScale(8),
 
    // paddingBottom: moderateScale(8),
  },
  image: {
    width: "100%",
    height: moderateScale(150),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(8),
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  viewReportButton: {
    backgroundColor: "rgba(196, 196, 196, 0.67)",
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(12),
    borderRadius: moderateScale(6),
    // shadowOffset: { width: 2, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation:2,
  },
  viewReportText: {
    color: "#1E88E5",
    fontWeight: "600",
    fontSize: moderateScale(14),
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    color: "#4285F4",
    marginRight: moderateScale(4),
    fontSize: moderateScale(15),
    fontWeight: "600",
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
})

export default RecordCard
