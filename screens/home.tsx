import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import MainTemp from '../components/MainTemp';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useWeatherStore } from 'store/weatherStore';
import SearchBar from 'components/SearchBar';
import { LinearGradient } from 'expo-linear-gradient';
import ForeCast from 'components/ForeCast';

export default function Home() {
  const { isLoading, weather, error, getDayName } = useWeatherStore();

  if (!weather && !isLoading && !error) {
    return (
      <SafeAreaView>
        <SearchBar />
        <Text>Busca una ciudad.</Text>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return <ActivityIndicator size={40} style={{ flex: 1, alignSelf: 'center' }} />;
  }

  if (weather.error) {
    return (
      <SafeAreaView>
        <SearchBar />
        <Text>Ciudad no encontrada.</Text>
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient
      colors={[
        '#abc4ff',
        '#d7e3fc',
        '#abc4ff',
        '#ccdbfd',
        '#abc4ff',
        '#d7e3fc',
        '#d7e3fc',
        '#abc4ff',
        '#ccdbfd',
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}>
      <SearchBar />

      {isLoading && <Text>Cargando...</Text>}

      {weather && (
        <View>
          <MainTemp weather={weather} />

          <ForeCast />
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
});
