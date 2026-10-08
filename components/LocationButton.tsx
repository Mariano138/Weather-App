import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import Feather from '@expo/vector-icons/Feather';
import useLocation from '@/hooks/useLocation';
import PopAnimation from '@/animations/PopAnimation';
import { useTranslation } from 'react-i18next';

export default function LocationButton() {
  const { t } = useTranslation();
  const { getLocation } = useLocation();
  const { animatedStyle, handlePressIn, handlePressOut } = PopAnimation();

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={styles.buttonStyles}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => getLocation()}>
        <Feather style={styles.textShadow} name="map-pin" size={30} color="white" />
        <Text style={[styles.descriptionText, styles.textShadow]}>{t('home.welcomeButton')}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonStyles: {
    justifyContent: 'center',
    backgroundColor: '#9ba9fc38',
    borderColor: '#ffffff',
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
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
});
