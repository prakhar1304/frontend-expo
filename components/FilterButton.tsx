import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

interface FilterButtonProps {
  title: string;
}

const FilterButton = ({ title }: FilterButtonProps) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
      <Feather name="chevron-down" size={moderateScale(20)} color="#333" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(8), // Adjust padding based on screen size
    paddingHorizontal: scale(10), // Adjust padding based on screen size
    borderRadius: moderateScale(30), // Adjust borderRadius based on screen size
    borderWidth: 1.5,
    borderColor: "#2F7FF2",
    backgroundColor: "white",
    // margin: 4,
  },
  buttonText: {
    fontSize: moderateScale(14), // Adjust font size based on screen size
    fontWeight: "500",
    marginRight: scale(4), // Adjust margin based on screen size
  },
});

export default FilterButton;
