import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import MainTemp from '../components/MainTemp';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useWeatherStore } from 'store/weatherStore';
import SearchBar from 'components/SearchBar';
import Forecast from 'components/Forecast';
import getBackground from 'helpers/getBackground';
import WelcomeView from 'components/WelcomeView';
import DescriptionView from 'components/DescriptionView';
import SkeletonLoader from 'components/SkeletonLoader';
import InfoView from 'components/InfoView';

export default function Home() {
  const { isLoading, weather, error } = useWeatherStore();

  if (!weather && !isLoading && !error) {
    return (
      <View style={styles.imageBackground}>
        <ImageBackground
          source={require('../assets/sun.png')}
          style={styles.imageBackground}
          resizeMode="cover">
          <SafeAreaView style={styles.container}>
            <SearchBar />
            <View style={styles.componentsContainer}>
              <WelcomeView />
              <DescriptionView />
              <InfoView />
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <ImageBackground
        source={require('../assets/sun.png')}
        resizeMode="cover"
        style={styles.imageBackground}>
        <SafeAreaView>
          <SearchBar />
          <Text>Ciudad no encontrada.</Text>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={getBackground(weather)}
      resizeMode="cover"
      style={styles.imageBackground}>
      <SafeAreaView>
        <ScrollView>
          <SearchBar />

          {isLoading && <Text>Cargando...</Text>}
          {weather && (
            <View>
              <MainTemp weather={weather} />
              <Forecast />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  componentsContainer: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingVertical: 80,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
});
