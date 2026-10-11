import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import SearchBar from '@/components/SearchBar';
import getBackground from '@/helpers/getBackground';
import LocationButton from '@/components/LocationButton';
import Animated from 'react-native-reanimated';
import scale from '@/animations/ScaleAnimation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

export default function CityNotFound({ city }: { city: string }) {
  const { t } = useTranslation();

  return (
    <ImageBackground source={getBackground()} resizeMode="cover" style={styles.imageBackground}>
      <SafeAreaView style={styles.container}>
        <SearchBar />

        <View style={styles.textContainer}>
          <Text style={[styles.descriptionText, styles.textShadow]}>{t('cityNotFound.title')}</Text>

          <Animated.Image
            style={[
              styles.tinyLogo,
              {
                animationName: scale,
                animationDuration: '5s',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'ease-in-out',
                animationDirection: 'alternate',
              },
            ]}
            source={require('@/assets/notFoundIcon.png')}
          />

          <Text style={[styles.descriptionText, styles.textShadow]}>
            {t('cityNotFound.subTitle')} "{city}"
          </Text>

          <View style={styles.line}></View>

          <Text style={[styles.descriptionText, styles.textShadow]}>
            {t('cityNotFound.suggestion')}
          </Text>

          <View style={styles.line}></View>

          <LocationButton />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    marginTop: 10,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  tinyLogo: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  textContainer: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingVertical: 50,
  },
  descriptionText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  textShadow: {
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  line: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 20,
  },
});
