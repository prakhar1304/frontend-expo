import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

interface TypeBadgeProps {
  type: string;
}

const TypeBadge = ({ type }: TypeBadgeProps) => {
  const getBadgeStyle = () => {
    switch (type) {
      case "Imaging":
        return {
          backgroundColor: "#BFEAF5",
          icon: "radio",
        };
      case "Labs":
        return {
          backgroundColor: "#FFF9C4",
          icon: "thermometer",
        };
      case "Outpatient":
        return {
          backgroundColor: "#E8F5E9",
          icon: "clipboard",
        };
      case "Genetic Testing":
        return {
          backgroundColor: "#E1BEE7",
          icon: "activity",
        };
      case "Pathology":
        return {
          backgroundColor: "#FFCCBC",
          icon: "thermometer",
        };
      case "Procedure":
        return {
          backgroundColor: "#BBDEFB",
          icon: "tool",
        };
      case "Hospitalization":
        return {
          backgroundColor: "#D1C4E9",
          icon: "home",
        };
      default:
        return {
          backgroundColor: "#E0E0E0",
          icon: "file",
        };
    }
  };

  const badgeStyle = getBadgeStyle();

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: badgeStyle.backgroundColor },
      ]}
    >
      <Feather name={badgeStyle.icon as any} size={moderateScale(18)} color="#333" />
      <Text style={styles.badgeText}>{type}</Text>
      <Feather name="more-vertical" size={moderateScale(18)} color="#333" />
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    marginTop: verticalScale(-18),
    marginRight: scale(-14),
    borderTopRightRadius: moderateScale(14),
    borderBottomLeftRadius: moderateScale(14),
  },
  badgeText: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    marginHorizontal: scale(6),
  },
});

export default TypeBadge;
