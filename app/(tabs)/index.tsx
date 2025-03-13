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
  StatusBar,
} from "react-native";
import { Upload, Camera } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { scale } from "react-native-size-matters";
import { useRouter } from "expo-router";
import LoadingModal from "@/app/(loading)/loading";
import Constants from "expo-constants";




export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  // const API_URL = "https://57e4-49-47-9-136.ngrok-free.app/api/v1";
  const API_URL =  Constants.expoConfig?.extra?.API_URL || process.env.EXPO_PUBLIC_API_URL || "https://57e4-49-47-9-136.ngrok-free.app/api/v1";

  // Function to upload file to server
  const uploadToServer = async (fileUri, fileType, fileName) => {
    try {
      setIsUploading(true);
      setModalVisible(false);

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

      // console.log("Upload successful:", response.data);
      // Alert.alert("Success", "File uploaded successfully!");

      router.navigate("/records")
      // return response.data;


      
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

 

  // Custom WhatsApp icon component
  const WhatsAppIcon = ({ size, color }) => (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
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
        backgroundColor: "transparent"
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
      <LoadingModal visible={isUploading} message="Uploading..." />
    <StatusBar barStyle="dark-content"  />
      <View style={styles.header}>
        <Text style={styles.headerText}>Health Care Docs</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Hi, Welcome to your</Text>
        <Text style={styles.healthText}>Health History</Text>

        {/* {API_URL ? <Text style = {{fontSize :10 , color:"blue"}}>{API_URL}</Text> : <></>} */}
        {/* <Text style={{alignSelf:"center"}}>Organize your medical records effortlessly with our timeline, ensuring you never worry about them again. Streamline your health journey with ease.</Text> */}


        <View style={styles.wraperUpload}>

       
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => setModalVisible(true)}
          disabled={isUploading}
        >
          <Image
            source={{uri: "https://res.cloudinary.com/dwbdtvo3s/image/upload/fl_preserve_transparency/v1741719220/upload_naits2.jpg?_s=public-apps"}}
            style={styles.uploadImage}
          />
          <Text style={styles.uploadText}>
            {isUploading ? "UPLOADING..." : "UPLOAD"}
          </Text>
        </TouchableOpacity>
        </View>

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
                  <View style={[
                    styles.iconWrapper,
                    option.id === "whatsapp" || option.id === "mail" 
                      ? { backgroundColor: "rgba(163, 152, 152, 0.96)" } 
                      : { backgroundColor: "rgba(163, 152, 152, 0.96)" }
                  ]}>
                    {option.icon({ size: 24, color: "#fff", strokeWidth: 2 })}
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
// Updated styles for the main view
container: {
  flex: 1,
  backgroundColor: "#FFFFFF",
},
header: {
  backgroundColor: "#FFFFFF",
  padding: 20,
  paddingTop: 60,
  borderBottomWidth: 1,
  borderBottomColor: "#EEEEEE",
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 2,
},
wraperUpload:{
  borderColor: "#BAD4FC",
  borderWidth: 2.5,
  borderStyle: "dashed",
  padding:20,
  width: scale(300),
},
headerText: {
  color: "#000000",
  fontSize: 22,
  fontWeight: "bold",
},
content: {
  flex: 1,
  padding: 24,
  alignItems: "center",
 
},
welcomeText: {
  fontSize: 20,
  marginTop: 40,
  color: "#000000",
  fontWeight: "500",
},
healthText: {
  fontSize: 32,
  fontWeight: "bold",
  color: "#2F7FF2",
  marginTop: 8,
  marginBottom: 20,
},
uploadButton: {
  marginTop: 30,
  alignItems: "center",
},
uploadImage: {
  width: 220,
  height: 220,
  borderRadius: 16,
  marginBottom: 24,
  borderWidth: 1,
  borderColor: "#EEEEEE",
},
uploadText: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#2F7FF2",
  letterSpacing: 0.5,
},
viewReportsButton: {
  marginTop: 40,
  paddingVertical: 16,
  paddingHorizontal: 32,
  backgroundColor: "#000000",
  borderRadius: 12,
  width: "80%",
  alignItems: "center",
},
viewReportsText: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#FFFFFF",
  letterSpacing: 0.5,
},



  //model
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
  iconWrapper: {
    width: 65,
    height: 65,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    marginTop: 40,
    borderColor: "#fff",
    borderWidth: 2,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
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

function useRoute() {
  throw new Error("Function not implemented.");
}
