import { StyleSheet, Text, View } from 'react-native';
import useRandomCity from 'hooks/useRandomCity';
import useTypingText from 'hooks/useTypingText';
import Animated from 'react-native-reanimated';
import { BlinkAnimation } from 'animations/BlinkAnimation';

export default function WelcomeView() {
  const cities = useRandomCity();
  const typing = useTypingText(cities);
  const blink = BlinkAnimation;

  return (
    <View style={styles.container}>
      <View style={styles.cityContainer}>
        <Text style={[styles.cityText, styles.textShadow]}>{typing}</Text>
        <Animated.Text
          style={[
            styles.textShadow,
            styles.cityText,
            { fontSize: 30 },
            {
              animationName: blink,
              animationDuration: '800ms',
              animationIterationCount: 'infinite',
            },
          ]}>
          |
        </Animated.Text>
      </View>
      <Text style={[styles.descriptionText, styles.textShadow]}>
        Descubre el clima de cualquier ciudad
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
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
