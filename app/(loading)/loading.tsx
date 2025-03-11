// components/LoadingModal.tsx
import React from 'react';
import { Modal, View, ActivityIndicator, Text, StyleSheet } from 'react-native';

type LoadingModalProps = {
  visible: boolean;
  message?: string;
};

const LoadingModal: React.FC<LoadingModalProps> = ({ visible, message = 'Loading...' }) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#222',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  message: {
    marginTop: 12,
    color: '#fff',
    fontSize: 16,
  },
});
