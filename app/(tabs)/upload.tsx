import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";


const reportData = [
  {
    title: "MRI : Brain",
    type: "Imaging",
    doctor: "Dr. Surabhi Anand",
    date: "2025-12-05",
    image: "https://example.com/mri-scan.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    additionalDetails: {
      "Clinical History": "The patient presented with occasional headaches and dizziness",
      "Findings": "This MRI of the brain reveals no significant abnormalities or pathologies."
    }
  },
  {
    title: "Thyroid Profile",
    type: "Labs",
    doctor: "Dr. Surabhi Anand",
    date: "2025-11-25",
    image: "https://example.com/labs-report.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    additionalDetails: {
      "Basophils": "0 10^3/uL",
      "BUN/Creatinine Blood": "29",
      "Calcium (Blood)": "8.5 - 12.0 mg/dL"
    }
  },
  {
    title: "Prescription",
    type: "Outpatient",
    doctor: "Dr. Surabhi Anand",
    date: "2025-11-15",
    image: "https://example.com/prescription.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    additionalDetails: {
      "Assessment": "Lorem ipsum dolor sit amet",
      "Problem List": [
        "Atrial fibrillation",
        "Chest pain",
        "Diverticulosis of colon",
        "Partial colectomy"
      ]
    }
  },
  {
    title: "HFE Analysis",
    type: "Genetic Testing",
    doctor: "Dr. Surabhi Anand",
    date: "2025-09-15",
    image: "https://example.com/genetic-test.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    additionalDetails: {
      "Methodology": "Normal biventricular size and systolic function with an ejection fraction of 60–65%.",
      "Interpretation": "Atrial fibrillation, chest pain, hypertensive heart disease and aneurysm of aortic root"
    }
  },
  {
    title: "Pathology : Colon",
    type: "Pathology",
    doctor: "Dr. Surabhi Anand",
    date: "2025-09-05",
    image: "https://example.com/pathology.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    additionalDetails: {
      "Diagnosis": "Descending colon, polypectomy: Colonic mucosa with benign lymphoid aggregate",
      "Findings": "Lorem ipsum dolor sit amet"
    }
  },
  {
    title: "Echocardiogram",
    type: "Procedure",
    doctor: "Dr. Surabhi Anand",
    date: "2025-06-15",
    image: "https://example.com/echo.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    additionalDetails: {
      "Summary": "Normal biventricular size and systolic function with ejection fraction of 60–65%",
      "Note": "No abnormal valvular structures"
    }
  },
  {
    title: "Discharge Summary",
    type: "Hospitalization",
    doctor: "Dr. Surabhi Anand",
    date: "2025-01-05",
    image: "https://example.com/discharge.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    additionalDetails: {
      "Chief Complaint": "A 56-year-old man who 6 months ago had colon resection for diverticulitis, colostomy, and Hartmann pouch.",
      "Summary": "Patient now admitted for reversal of his colostomy."
    }
  }
];


const Yo = () => {
  return (
    <ScrollView style={styles.container}>
      {reportData.map((report, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.date}>{new Date(report.date).toDateString()}</Text>
          <Text style={styles.title}>{report.title}</Text>
          <Text style={styles.type}>Type: {report.type}</Text>
          <Text style={styles.doctor}>Doctor: {report.doctor}</Text>
          <Text style={styles.description}>{report.description}</Text>
          <Image source={{ uri: report.image }} style={styles.image} />
          <View style={styles.detailsContainer}>
            {Object.entries(report.additionalDetails).map(([key, value], idx) => (
              <Text key={idx} style={styles.detailText}>
                <Text style={styles.detailKey}>{key}:</Text>{" "}
                {Array.isArray(value)
                  ? value.map((item, i) => `\n  • ${item}`).join("")
                  : String(value)}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3
  },
  date: { fontSize: 12, color: "#888", marginBottom: 4 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  type: { fontSize: 14, fontWeight: "600", marginBottom: 2 },
  doctor: { fontSize: 14, marginBottom: 4 },
  description: { fontSize: 14, fontStyle: "italic", marginBottom: 6 },
  image: { height: 120, borderRadius: 8, marginBottom: 10 },
  detailsContainer: { marginTop: 8 },
  detailText: { fontSize: 14, marginBottom: 4 },
  detailKey: { fontWeight: "bold" }
});

export default Yo;
