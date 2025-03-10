import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"

interface FilterButtonProps {
  title: string
}

const FilterButton = ({ title }: FilterButtonProps) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
      <Feather name="chevron-down" size={20} color="#333" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "#2F7FF2",
    backgroundColor: "white",
    margin: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 4,
  },
})

export default FilterButton

