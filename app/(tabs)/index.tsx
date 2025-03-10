"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
  Image,
  Alert,
} from "react-native";
import { Upload, Camera } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const API_URL = "http://192.168.29.150:8000/api/v1";

  // Function to upload file to server
  const uploadToServer = async (fileUri, fileType, fileName) => {
    try {
      setIsUploading(true);

      // Create form data
      const formData = new FormData();
      formData.append("file", {
        uri: fileUri,
        type: fileType,
        name: fileName || "upload.jpg",
      } as any);

      // Make API request
      const response = await axios.post(`${API_URL}/file/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload successful:", response.data);
      Alert.alert("Success", "File uploaded successfully!");

      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      Alert.alert("Error", "Failed to upload file. Please try again.");
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleCamera = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera permissions to make this work!"
        );
        return;
      }
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      try {
        await uploadToServer(
          asset.uri,
          asset.mimeType || "image/jpeg",
          `camera_${Date.now()}.jpg`
        );
        setModalVisible(false);
      } catch (error) {
        console.error("Upload failed after camera capture", error);
      }
    }
  };

  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
      });

      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        try {
          await uploadToServer(asset.uri, asset.mimeType, asset.name);
          setModalVisible(false);
        } catch (error) {
          console.error("Upload failed after document pick", error);
        }
      }
    } catch (err) {
      console.log("DocumentPicker Error:", err);
      Alert.alert("Error", "Failed to pick document");
    }
  };

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${API_URL}/reports`);
      console.log("Reports fetched:", response.data);
      // You can use this data to display reports in your app
    } catch (error) {
      console.error("Error fetching reports:", error);
      Alert.alert("Error", "Failed to fetch reports");
    }
  };

  // Custom WhatsApp icon component
  const WhatsAppIcon = ({ size, color }) => (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"transparent"
      }}
    >
      <Image
      source={require('../../assets/images/Whatsapp.png')}
      />
    </View>
  );

  // Custom Gmail icon component
  const GmailIcon = ({ size, color }) => (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"transparent"
      }}
    >
     <Image
      source={require('../../assets/images/Mail.png')}
      />
    </View>
  );

  const UPLOAD_OPTIONS = [
    {
      id: "device",
      title: "Upload",
      subtitle: "from device",
      icon: (props) => <Upload {...props} />,
      onPress: handleFilePicker,
    },
    {
      id: "camera",
      title: "Take",
      subtitle: "a photo",
      icon: (props) => <Camera {...props} />,
      onPress: handleCamera,
    },
    {
      id: "whatsapp",
      title: "Upload",
      subtitle: "with whatsapp",
      icon: (props) => <WhatsAppIcon {...props} />,
      onPress: handleFilePicker,
    },
    {
      id: "mail",
      title: "Upload",
      subtitle: "from mail",
      icon: (props) => <GmailIcon {...props} />,
      onPress: handleFilePicker,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Health Care Docs</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Hi, Welcome to your</Text>
        <Text style={styles.healthText}>Health Care Docs</Text>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => setModalVisible(true)}
          disabled={isUploading}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=500&auto=format&fit=crop",
            }}
            style={styles.uploadImage}
          />
          <Text style={styles.uploadText}>
            {isUploading ? "UPLOADING..." : "UPLOAD"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewReportsButton}
          onPress={fetchReports}
        >
          <Text style={styles.viewReportsText}>VIEW REPORTS</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.optionsGrid}>
              {UPLOAD_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionCard}
                  onPress={option.onPress}
                  disabled={isUploading}
                >
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                  <View style = {[{backgroundColor: "rgba(163, 152, 152, 0.96)",    width: 65,
    height: 65,
    borderRadius: 35,
    // backgroundColor: "#2F7FF2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    marginTop: 40,
    borderColor:"#fff",
    borderWidth:2,
    }]}>
                  <View style={styles.iconContainer}>
                    {option.icon({ size: 24, color: "#fff", strokeWidth: 2 })}
                  </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#2F7FF2",
    padding: 20,
    paddingTop: 60,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    marginTop: 40,
    color: "#000",
  },
  healthText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2F7FF2",
    marginTop: 8,
  },
  uploadButton: {
    marginTop: 60,
    alignItems: "center",
  },
  uploadImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2F7FF2",
  },
  viewReportsButton: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#2F7FF2",
    borderRadius: 10,
  },
  viewReportsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "transparent",
    borderRadius: 12,
    padding: 10,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  optionCard: {
    width: "48%",
    backgroundColor: "#333",
    borderRadius: 12,
    padding: 16,
    alignItems: "flex-start",
    marginBottom: 10,
    height: 200,
    paddingLeft: 25,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#2F7FF2",
    alignItems: "center",
    justifyContent: "center",
 
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginTop:10,
  },
  optionSubtitle: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
    marginTop: 4,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
