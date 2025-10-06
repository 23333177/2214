
import React from 'react';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/styles/commonStyles';

const tabs: TabBarItem[] = [
  {
    route: '/(home)',
    label: 'Accueil',
    icon: 'house',
  },
  {
    route: '/shop',
    label: 'Boutique',
    icon: 'music.note',
  },
  {
    route: '/gallery',
    label: 'Galerie',
    icon: 'photo',
  },
  {
    route: '/profile',
    label: 'Profil',
    icon: 'person',
  },
];

export default function TabLayout() {
  if (Platform.OS === 'web') {
    return (
      <NativeTabs>
        <NativeTabs.Screen
          name="(home)"
          options={{
            title: 'Accueil',
            tabBarIcon: ({ color }) => <Icon name="house" color={color} />,
          }}
        />
        <NativeTabs.Screen
          name="shop"
          options={{
            title: 'Boutique',
            tabBarIcon: ({ color }) => <Icon name="music.note" color={color} />,
          }}
        />
        <NativeTabs.Screen
          name="gallery"
          options={{
            title: 'Galerie',
            tabBarIcon: ({ color }) => <Icon name="photo" color={color} />,
          }}
        />
        <NativeTabs.Screen
          name="profile"
          options={{
            title: 'Profil',
            tabBarIcon: ({ color }) => <Icon name="person" color={color} />,
          }}
        />
      </NativeTabs>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(home)" />
        <Stack.Screen name="shop" />
        <Stack.Screen name="gallery" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
