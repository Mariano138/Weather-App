import { ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '@/components/SearchBar';
import WelcomeView from '@/components/WelcomeView';
import DescriptionView from '@/components/DescriptionView';
import InfoView from '@/components/InfoView';
import '@/i18n/i18n.config';
import ChangeLanguage from '@/components/ChangeLanguage';

export default function Home() {
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
            <ChangeLanguage />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    marginTop: 10,
  },
  componentsContainer: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingVertical: 50,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
});
