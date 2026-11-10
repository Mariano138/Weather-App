import { ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '@/components/common/SearchBar';
import WelcomeCard from '@/components/home/WelcomeCard';
import CityCard from '@/components/home/CityCard';

export default function Home() {
  return (
    <View style={styles.imageBackground}>
      <ImageBackground
        source={require('../assets/images/sun.png')}
        style={styles.imageBackground}
        resizeMode="cover"
        blurRadius={5}>
        <SafeAreaView style={styles.container}>
          <SearchBar />
          <WelcomeCard />
          {[0, 1].map((index) => (
            <CityCard key={index} />
          ))}
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    paddingTop: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },

  imageBackground: {
    width: '100%',
    height: '100%',
  },
});
