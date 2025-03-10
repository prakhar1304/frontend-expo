import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform, Image } from 'react-native';
import { Upload, Camera, Mail, Cloud } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCamera = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return;
      }
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0]);
      setModalVisible(false);
    }
  };

  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
      });

      if (result.assets) {
        console.log(result.assets[0]);
        setModalVisible(false);
      }
    } catch (err) {
      console.log('DocumentPicker Error:', err);
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
        >
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=500&auto=format&fit=crop' }}
            style={styles.uploadImage}
          />
          <Text style={styles.uploadText}>UPLOAD</Text>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
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