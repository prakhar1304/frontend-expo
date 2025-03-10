import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
<Tabs
  screenOptions={{
    // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    headerShown: false,
    tabBarButton: HapticTab,
    tabBarBackground: TabBarBackground,
    tabBarStyle: {
      backgroundColor: '#fff',
 
      position: 'absolute',
      bottom: 2,

    height: 55,
      // paddingBottom: 20,
  

    },
    tabBarLabelStyle: {
      fontSize: 12,
      marginBottom: 6,
    },
    tabBarIconStyle: {
      marginTop: 6,
    },
  }}>
 
  <Tabs.Screen
    name="upload"
    options={{
      title: 'Upload',
      tabBarIcon: ({ color }) => (
        <AntDesign name="appstore-o" size={24} color={color} />
      ),
    }}
  />
   <Tabs.Screen
    name="index"
    options={{
      title: 'Home',
      tabBarIcon: ({ color }) => (
        <IconSymbol size={28} name="house.fill" color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="new"
    options={{
      title: 'Records',
      tabBarIcon: ({ color }) => (
        // <IconSymbol size={28} name="folder-plus" color={color} />
        <MaterialCommunityIcons name="folder-multiple-plus-outline" size={28} color={color} />
      ),
    }}
  />
</Tabs>

  );
}
