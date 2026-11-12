import { ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '@/components/common/SearchBar';
import WelcomeCard from '@/components/home/WelcomeCard';
import CityCard from '@/components/home/CityCard';
import useRandomCities from '@/hooks/useRandomCities';

export default function Home() {
  const cities = useRandomCities(2);

  return (
    <View style={styles.imageBackground}>
      <ImageBackground
        source={require('../assets/images/sun.png')}
        style={styles.imageBackground}
        resizeMode="cover">
        <SafeAreaView style={styles.container}>
          <View style={styles.spacer} />
          <SearchBar />
          <WelcomeCard />
          {cities.map((city) => (
            <CityCard key={city} city={city} />
          ))}
          <View style={styles.spacer} />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },

  spacer: {
    flex: 1,
  },

  imageBackground: {
    width: '100%',
    height: '100%',
  },
});
