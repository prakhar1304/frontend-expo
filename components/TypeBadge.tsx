import { View, Text, StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"

interface TypeBadgeProps {
  type: string
}

const TypeBadge = ({ type }: TypeBadgeProps) => {
  const getBadgeStyle = () => {
    switch (type) {
      case "Imaging":
        return {
          backgroundColor: "#BFEAF5",
          icon: "radio",
        }
      case "Labs":
        return {
          backgroundColor: "#FFF9C4",
          icon: "flask",
        }
      case "Outpatient":
        return {
          backgroundColor: "#E8F5E9",
          icon: "clipboard",
        }
      case "Genetic Testing":
        return {
          backgroundColor: "#E1BEE7",
          icon: "activity",
        }
      case "Pathology":
        return {
          backgroundColor: "#FFCCBC",
          icon: "thermometer",
        }
      case "Procedure":
        return {
          backgroundColor: "#BBDEFB",
          icon: "tool",
        }
      case "Hospitalization":
        return {
          backgroundColor: "#D1C4E9",
          icon: "home",
        }
      default:
        return {
          backgroundColor: "#E0E0E0",
          icon: "file",
        }
    }
  }

  const badgeStyle = getBadgeStyle()

  return (
    <View style={[styles.badge, { backgroundColor: badgeStyle.backgroundColor }]}>
      <Feather name={badgeStyle.icon as any} size={20} color="#333" />
      <Text style={styles.badgeText}>{type}</Text>
      <Feather name="more-vertical" size={20} color="#333" />
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    
    marginTop: -22,
    marginRight:-17,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    
  },
  badgeText: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 8,
  },
})

export default TypeBadge

