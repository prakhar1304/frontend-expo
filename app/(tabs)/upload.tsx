import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Platform } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

// Get the API URL from environment variables or use a default for development
const API_URL =  'http://192.168.29.150:8000';

export default function ReportsScreen() {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/api/v1/file/reports`, {
        // Add any necessary headers here
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // Add timeout to prevent infinite loading
        timeout: 10000,
      });
     
      setReports(Array.isArray(response.data) ? response.data : [response.data]);

      console.log('Reports fetched:', reports);
      
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Handle specific error cases
        if (err.code === 'ECONNABORTED') {
          setError('Request timed out. Please try again.');
        } else if (!err.response) {
          setError('Network error. Please check your connection.');
        } else {
          setError(`Error: ${err.response.status} - ${err.response.data?.message || 'Something went wrong'}`)
        }
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reports</Text>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={fetchReports}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Fetch Reports</Text>
        )}
      </TouchableOpacity>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.resultContainer}>
        <Text style={styles.resultHeader}>
          {reports.length > 0 ? `Reports (${reports.length})` : 'No reports available'}
        </Text>

        <ScrollView style={styles.reportsScroll}>
          {reports.map((report, index) => (
            <View key={index} style={styles.reportItem}>
              <Text style={styles.reportText}>
                {JSON.stringify(report, null, 2)}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
  },
  resultContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  resultHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  reportsScroll: {
    flex: 1,
  },
  reportItem: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  reportText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    color: '#334155',
  },
});