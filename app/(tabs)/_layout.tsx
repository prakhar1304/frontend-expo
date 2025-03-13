import { Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
<Tabs
  screenOptions={{
    // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    headerShown: false,
    tabBarButton: HapticTab,
    // tabBarBackground: TabBarBackground,
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
    name="index"
    options={{
      title: 'Home',
      tabBarIcon: ({ color }) => (
        <IconSymbol size={28} name="house.fill" color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="records"
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
