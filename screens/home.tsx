import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

import MainTemp from '../components/MainTemp';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useWeatherStore } from 'store/weatherStore';
import SearchBar from 'components/SearchBar';
import ForeCast from 'components/ForeCast';
import getBackground from 'helpers/getBackground';
import { BlurView } from 'expo-blur';
import WelcomeView from 'components/WelcomeView';
import DescriptionView from 'components/DescriptionView';
import useRandomBackground from 'hooks/useRandomBackground';
import BackgroundAnimation from 'animations/BackgroundAnimation';
import SkeletonLoader from 'components/SkeletonLoader';

export default function Home() {
  const { isLoading, weather, error } = useWeatherStore();
  const background = useRandomBackground();

  if (!weather && !isLoading && !error) {
    return (
      <View style={styles.background}>
        <BackgroundAnimation source={background} />
        <SafeAreaView style={styles.container}>
          <WelcomeView />
          <SearchBar />
          <DescriptionView />
        </SafeAreaView>
      </View>
    );
  }

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <ImageBackground source={getBackground(weather)} resizeMode="cover" style={styles.background}>
        <SafeAreaView>
          <SearchBar />
          <Text>Ciudad no encontrada.</Text>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={getBackground(weather)} resizeMode="cover" style={styles.background}>
      <SafeAreaView>
        <BlurView
          style={styles.blurBackground}
          intensity={7}
          tint="dark"
          experimentalBlurMethod="dimezisBlurView">
          <SearchBar />
        </BlurView>
        <ScrollView>
          {isLoading && <Text>Cargando...</Text>}

          {weather && (
            <View>
              <MainTemp weather={weather} />

              <ForeCast />
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
  background: {
    width: '100%',
    height: '100%',
  },
  blurBackground: {
    marginHorizontal: 16,
    overflow: 'hidden',
    borderRadius: 20,
  },
});
