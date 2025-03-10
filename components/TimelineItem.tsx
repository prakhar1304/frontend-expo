import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Svg, Line } from "react-native-svg"

interface TimelineItemProps {
  date: string
  children: React.ReactNode
  isLast?: boolean
}

const TimelineItem = ({ date, children, isLast = false }: TimelineItemProps) => {
  const formattedDate = new Date(date)
  const month = formattedDate.toLocaleString("default", { month: "short" })
  const day = formattedDate.getDate()

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          {month} {day}th
        </Text>
      </View>

      <View style={styles.timelineContainer}>
        {/* <View style={styles.dot} /> */}
        {!isLast && (
          <Svg height="120%" width="120%" style={styles.line}>
            <Line x1="10" y1="0" x2="10" y2="100%" stroke="#4285F4" strokeWidth="5" />
          </Svg>
        )}
      </View>

      <View style={styles.contentContainer}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dateContainer: {
    width: 80,
    // backgroundColor: "#4285F4",
    // alignItems: "flex-start",
    zIndex: 2,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#ffffff",
    alignSelf: "center",
    // height: 30,
  },
  timelineContainer: {
    alignItems: "center",
  
    width: 20,
    marginLeft: -50,
    zIndex: 1,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4285F4",
    marginTop: 4,
  },
  line: {
    position: "absolute",
    top: 16,
    left: 0,
    right: 0,
    bottom: -20,
  },
  contentContainer: {
    flex: 1,
  },
})

export default TimelineItem

