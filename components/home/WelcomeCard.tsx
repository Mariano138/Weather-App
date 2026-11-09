import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import useRotatingCity from '@/hooks/useRotatingCity';
import useTypingText from '@/hooks/useTypingText';
import { blinkAnimation } from '@/animations/blink';
import { useTranslation } from 'react-i18next';
import LocationButton from '@/components/common/LocationButton';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import useZoomAnimation from '@/hooks/useZoomAnimation';

export default function WelcomeCard() {
  const cities = useRotatingCity();
  const typing = useTypingText(cities);
  const { t } = useTranslation();
  const { animatedStyle, handlePressIn, handlePressOut } = useZoomAnimation();

  return (
    <Animated.View
      style={[styles.container, animatedStyle]}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}>
      <View style={styles.cityContainer}>
        <Text style={[styles.cityText, styles.textShadow]}>{typing}</Text>
        <Animated.Text
          style={[
            styles.textShadow,
            styles.cityText,
            { fontSize: 30 },
            {
              animationName: blinkAnimation,
              animationDuration: '800ms',
              animationIterationCount: 'infinite',
            },
          ]}>
          |
        </Animated.Text>
      </View>
      <Text style={[styles.descriptionText, styles.textShadow]}>{t('home.welcomeText')}</Text>
      <View style={styles.line}></View>
      <LocationButton />
      <LanguageSwitcher />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingVertical: 25,
  },
  cityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: '900',
    textAlign: 'center',
  },
  descriptionText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
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
