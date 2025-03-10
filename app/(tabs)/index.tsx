import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform, Image, Alert } from 'react-native';
import { Upload, Camera, Mail, Cloud } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios'; // Make sure to install axios: npm install axios

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const API_URL = 'http://192.168.29.150:8000/api/v1'; 

  // Function to upload file to server
  const uploadToServer = async (fileUri, fileType, fileName) => {
    try {
      setIsUploading(true);
      
      // Create form data
      const formData = new FormData();
      formData.append('file', {
        uri: fileUri,
        type: fileType,
        name: fileName || 'upload.jpg',
      } as any);
      
      // Make API request
      const response = await axios.post(`${API_URL}/file/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Upload successful:', response.data);
      Alert.alert('Success', 'File uploaded successfully!');
      
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      Alert.alert('Error', 'Failed to upload file. Please try again.');
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleCamera = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Sorry, we need camera permissions to make this work!');
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
        await uploadToServer(asset.uri, asset.mimeType || 'image/jpeg', `camera_${Date.now()}.jpg`);
        setModalVisible(false);
      } catch (error) {
        console.error('Upload failed after camera capture', error);
      }
    }
  };

  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
      });

      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        try {
          await uploadToServer(asset.uri, asset.mimeType, asset.name);
          setModalVisible(false);
        } catch (error) {
          console.error('Upload failed after document pick', error);
        }
      }
    } catch (err) {
      console.log('DocumentPicker Error:', err);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${API_URL}/reports`);
      console.log('Reports fetched:', response.data);
      // You can use this data to display reports in your app
    } catch (error) {
      console.error('Error fetching reports:', error);
      Alert.alert('Error', 'Failed to fetch reports');
    }
  };

  const UPLOAD_OPTIONS = [
    {
      id: 'device',
      title: 'Upload',
      subtitle: 'from device',
      icon: (props) => <Cloud {...props} />,
      onPress: handleFilePicker,
    },
    {
      id: 'camera',
      title: 'Take',
      subtitle: 'a photo',
      icon: (props) => <Camera {...props} />,
      onPress: handleCamera,
    },
    {
      id: 'whatsapp',
      title: 'Upload',
      subtitle: 'with whatsapp',
      icon: (props) => <Upload {...props} />,
      onPress: handleFilePicker,
    },
    {
      id: 'mail',
      title: 'Upload',
      subtitle: 'from mail',
      icon: (props) => <Mail {...props} />,
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
            source={{ uri: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=500&auto=format&fit=crop' }}
            style={styles.uploadImage}
          />
          <Text style={styles.uploadText}>
            {isUploading ? 'UPLOADING...' : 'UPLOAD'}
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
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Upload Photo/Video</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionsGrid}>
              {UPLOAD_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionCard}
                  onPress={option.onPress}
                  disabled={isUploading}
                >
                  <View style={styles.iconContainer}>
                    {option.icon({ size: 24, color: '#fff', strokeWidth: 2 })}
                  </View>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#2F7FF2',
    padding: 20,
    paddingTop: 60,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    marginTop: 40,
    color: '#000',
  },
  healthText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2F7FF2',
    marginTop: 8,
  },
  uploadButton: {
    marginTop: 60,
    alignItems: 'center',
  },
  uploadImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F7FF2',
  },
  viewReportsButton: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#2F7FF2',
    borderRadius: 10,
  },
  viewReportsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  optionCard: {
    width: '47%',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2F7FF2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
});