import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

// import { reportData } from "../data/reportData"
import FilterButton from "./FilterButton";
import TimelineItem from "./TimelineItem";
import RecordCard from "./RecordCard";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import LoadingModal from "@/app/(loading)/loading";
import { useFocusEffect } from "expo-router";
import Constants from "expo-constants";

// const API_URL = Constants.manifest?.extra?.API_URL || Constants.expoConfig?.extra?.API_URL || "https://57e4-49-47-9-136.ngrok-free.app/api/v1";


const API_URL =
  Constants.expoConfig?.extra?.API_URL ||
  process.env.EXPO_PUBLIC_API_URL ||
  "https://57e4-49-47-9-136.ngrok-free.app/api/v1";

const RecordsScreen = () => {
  const [reports, setReports] = useState<any[]>([]);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log("API URLl-----------:", API_URL);
    console.log(`${API_URL}/file/reports`);
  }, []);

  
  const fetchReports = async () => {
    try {
      setLoading(true);
      console.log("fetching reports");
      const response = await axios.get(`${API_URL}/file/reports`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });
      
     
       const reportsData = Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
      setReports(reportsData);
      console.log("reportsData after parsing:", JSON.stringify(reportsData, null, 2));

      
    } catch (err: any) {
      setError("Failed to fetch reports");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchReports();
      // console.log("reports", reports);
    }, [])
  );

  useEffect(() => {
    console.log("Updated reports:", reports);
    console.log("myArray (snapshot):", JSON.stringify(reports, null, 2));
    if (reports.length > 0) {
      console.log("First report object:", reports[0]);
    }

  }, [reports]);

  return (
    <View style={styles.container}>
         <LoadingModal visible={loading} message="Please wait..." />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >

{/* <Header /> */}
        <Text style={styles.title}>Records</Text>

        <View style={styles.filterContainer}>
          <FilterButton title="Doctor" />
          <FilterButton title="Disease" />
          <FilterButton title="Records Type" />
        </View>

        <View style={styles.yearContainer}>
          <TouchableOpacity style={styles.yearButton}>
            <Text style={styles.yearText}>2025</Text>
          </TouchableOpacity>
        </View>



        {reports.map((report, index) => (
          <TimelineItem
            key={index}
            date={report.date}
            isLast={index === reports.length - 1}
          >

                {/* Add spacing below card except for the last one */}
            {index !== reports.length  && <View style={{ height: 20 }} />}
            <RecordCard report={report} />
         
             {/* {index !== reports.length - 1 && <View style={{ height: 12 }} />} */}
          </TimelineItem>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 16,
    paddingHorizontal:20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    // marginLeft: -5,
    paddingHorizontal:10,
  },
  scrollView: {
    flex: 1,
  },
  yearContainer: {
    marginBottom: 10,
    alignItems: "flex-start",
    paddingHorizontal:10,
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
});

export default RecordsScreen;
function useRoute() {
  throw new Error("Function not implemented.");
}

