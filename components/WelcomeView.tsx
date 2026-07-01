import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useRandomCity from 'hooks/useRandomCity';
import useTypingText from 'hooks/useTypingText';
import Animated from 'react-native-reanimated';
import { BlinkAnimation } from 'animations/BlinkAnimation';
import useLocation from 'hooks/useLocation';
import Feather from '@expo/vector-icons/Feather';

export default function WelcomeView() {
  const cities = useRandomCity();
  const typing = useTypingText(cities);
  const blink = BlinkAnimation;
  const { getLocation } = useLocation();

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
        Descubre el clima de cualquier ciudad del mundo
      </Text>
      <View style={styles.line}></View>
      <TouchableOpacity style={styles.buttonSyles} onPress={() => getLocation()}>
        <Feather style={styles.textShadow} name="map-pin" size={30} color="white" />
        <Text style={[styles.descriptionText, styles.textShadow]}>Usar mi ubicación actual</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>
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
  buttonSyles: {
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
  line: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 20,
  },
});
